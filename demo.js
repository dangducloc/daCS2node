// npm run dev    
import express from 'express'
import doenv from 'dotenv'
import cookieParser from 'cookie-parser'
import * as connect from './Connect.js'
import * as mail from './Mail.js'

doenv.config()

const app = express()
app.set('view-engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const port = 8000


const Conn = new connect.PoolOf_conn(process.env.HOST, process.env.USER, process.env.PASS, process.env.DB)
const pool = connect.MakePool(Conn)

const rs = await connect.Food_List(pool)

const types = await connect.Food_Types(pool)
// console.log(types)
// //const menu = rs.map(item => item.Food)
// // const count = rs.length
// console.log(rs)

const mailFrom = mail.whereTosend(process.env.Mail, process.env.app_Pass)

app.get('/', async (req, res) => {
	const username = req.cookies.user
	const iduser = await connect.GETidUser(pool, username)
	res.render("index.ejs",
		{
			iduser: iduser,
			username: username,
			Food_List: rs,
			FoodTypes: types,
			page: "home"
		})
})
app.get('/index.ejs', (req, res) => {
	res.redirect("/");
})

app.get('/InAndUp', (req, res) => {
	res.render("InAndUp.ejs")
})

app.post("/SigntUp", async (req, res) => {
	try {
		const name = req.body.Uname
		const mail = req.body.Mail
		const password = req.body.Pass
		const tel = req.body.Tel
		await connect.SigntUp(pool, name, password, mail, tel)
		res.redirect("/")
	} catch (error) { console.log(error) }
	//res.send(`Tên:${name} Mail:${mail} Pass:${password} Tel:${tel}`)
})


app.post("/login", async (request, response) => {
	var name = request.body.name
	var pass = request.body.pass
	const rs = await connect.Login(pool, name, pass)
	if (rs === 0) {
		console.log("signin fail")
		return response.redirect('/')

	}
	if (rs === 1) {
		console.log("signin success")
		let options = {
			maxAge: 1000 * 60 * 60, // would expire after 60 minutes
			httpOnly: true, // The cookie only accessible by the web server
			// signed: true // Indicates if the cookie should be signed
		}
		response.cookie('user', name, options).redirect('/')

	}
	console.log(`tên:${name}/pass:${pass}`)
})

app.get('/Logout', (req, res) => {
	res.clearCookie("user")
	res.redirect('/')
})


app.get('/addCart/:id', async (req, res) => {
	const foodID = req.params.id
	const username = req.cookies.user
	const idname = await connect.GETidUser(pool, username)
	if (idname == -1) {
		return res.redirect('/')
	}
	else {
		connect.addCart(pool, idname, foodID)
	}
	// console.log(`${idname},${foodID}`);
	return res.redirect('/Cart')
})
app.get('/Cart', async (req, res) => {
	const username = req.cookies.user
	const iduser = await connect.GETidUser(pool, username)
	const cart = await connect.GetCart(pool, iduser)
	//console.log(cart)
	res.render('Cart.ejs', {
		username: username,
		iduser: iduser,
		cart: cart,
		page: "cart"
	})
})
app.post('/Remove', async (req, res) => {
	var iduser = req.body.iduser
	var idfood = req.body.idfood
	try {
		await connect.deleteFromCart(pool, iduser, idfood)
	} catch (error) {
		console.log(error.stack)
	}
	res.redirect('/Cart')

})
app.post('/Save', async (req, res) => {
	var iduser = req.body.iduser
	var idfood = req.body.idfood
	var amount = req.body.quantity
	try {
		await connect.SavetheChange(pool, iduser, idfood, amount)
	} catch (error) {
		console.log(error.stack)
	}
	console.log(`${iduser},${idfood},${amount}`)
	res.redirect('/Cart#cart')
})
app.post('/Buynow', async (req, res) => {
	const form = req.body
	var iduser = form.iduser
	var idfood = form.idfood
	var amount = form.quantity
	var from = form.from
	var food = await connect.Food(pool, idfood)
	const user = res.cookie.user
	console.log(food)
	res.render('buynow.ejs',
		{
			page: "buynow",
			username: user,
			iduser: iduser,
			from: from,
			food: food,
			amount: amount
		}
	)
	// res.send(idfood)

})
app.post('/singleCheckout', async (req, res) => {
	let data = req.body
	// console.log(data);

	let food = await connect.Food(pool, data.idfood)
	let user = await connect.GetUser(pool, data.iduser)
	const html = `
			<h1>Thank ${user.User_name} for shopping with us!</h1>
			<p>We are pleased to inform you that your order has been successfully processed.</p>
			<p>Your order details:</p>
			<ul>
			<li>Product: ${food[0].Food}</li>
			<li>Quantity: ${data.amount}</li>
			<li>Total Value: $${data.amount * food[0].Price}</li>
			</ul>
			<p>We will send your order to ${data.Address} in a hours</p>
			<p>Thank you for trusting and using our services!</p>
		`
	if (data.from === "index") {
		try {
			connect.generalOrder(pool, data.iduser, data.Address, data.paymentMethod)
			connect.SingleorderDetail(pool, data.iduser, data.idfood, data.amount)
			var flag = connect.updateFoodAmount(pool, data.idfood, data.amount)
			if (flag === -1) {
				return res.render('Lỗi')
			}
			mail.sendNotifi(mailFrom, user.Mail, html)
			console.log("sent!!!");
		} catch (error) {
			console.log(error)
		}
		// res.send(data)
		res.redirect("/")
	}
	else if (data.from === 'cart') {
		try {
			connect.generalOrder(pool, data.iduser, data.Address, data.paymentMethod)
			connect.SingleorderDetail(pool, data.iduser, data.idfood, data.amount)
			connect.deleteFromCart(pool, data.iduser, data.idfood)
			if (flag === -1) {
				return res.render('Lỗi')
			}
			mail.sendNotifi(mailFrom, user.Mail, html)
			console.log("sent!!!");
		} catch (error) {
			console.log(error)
		}
		res.send(data)
	}
	else {
		res.send("lỗi òi !!!!")
	}
})

app.post('/BuyAll', async (req, res) => {
	
	const data = req.body
	console.log(data);
	let user = await connect.GetUser(pool, data.iduser)
	var rowAmount = data.amount, rowPrice = data.price, rowIDfood = data.idfood
	try {
		await connect.generalOrder(pool, data.iduser, data.Address, data.paymentMethod)
	} catch (error) {
		console.error();
	}
	var idorder = await connect.getLatestorder(pool, data.iduser)
	var arr2D = []
	for (let i = 0; i < rowAmount.length; i++) {
		var idfood = parseInt(rowIDfood[i])
		var amount = parseInt(rowAmount[i])
		var price = parseInt(rowPrice[i])
		let checker = await connect.updateFoodAmount(pool,idfood,amount)
		if(checker === -1){
			continue
		}
		arr2D.push([idorder, idfood, amount, price]);
	}
	var tr = '';
	for (let index = 0; index < arr2D.length; index++) {
		var [food] =await connect.Food(pool,arr2D[index][1])
		var td = `<tr><td>${food.Food}</td><td style="text-align:center">${rowAmount[index]}</td><td  style="text-align:center">${rowPrice[index]}</td></tr>`
		tr+=td
		// console.log(td)
	}
	const html = `
	<h1>Thank ${user.User_name} for shopping with us!</h1>
	<p>We are pleased to inform you that your order has been successfully processed.</p>
	<p>Your order details:</p>
	<table>
	<tr><th>Food</th><th>Quantity</th><th>Price</th></tr>
	${tr}
  	</table>
	<p>We will send your order to ${data.Address} in a hours</p>
	<p>Thank you for trusting and using our services!</p>
`
	// var check = []
	try {
		await connect.BuyAll(pool, arr2D)
		await connect.deleteCart(pool, data.iduser)
		mail.sendNotifi(mailFrom,user.Mail,html)

	} catch (error) {
		console.error();
	}
	res.redirect('/')
})

app.get('/Feedback:id', async (req, res) => {
	const username = req.cookies.user
	const userid = await connect.GETidUser(pool, username)
	const foodID = req.params.id
	const food = await connect.Food(pool, foodID)
	const List_Com = await connect.showComment(pool, foodID)
	//console.log(List_Com)

	// console.log(`${foodID}+${userid}+${username}`)
	res.render('demoComment.ejs',
		{
			username: username,
			userID: userid,
			food: food[0].Food,
			info: food[0].info_Detail,
			foodID: foodID,
			img: food[0].img_src,
			comment: List_Com,
			iduser: userid,
			page: "feedback"
		})
})

app.post('/Post_comment', async (req, res) => {
	var a = req.body
	const user = req.cookies.user
	console.log(a)
	var iduser = a.iduser
	if (iduser == -1) {
		return res.redirect('/')
	}
	var idfood = a.foodid
	var comment = a.comment
	try {
		await connect.SavetheCom(pool, iduser, idfood, comment)
	} catch (error) {
		console.log(error.stack)
	}
	var date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1, day = date.getDate(),
		hour = date.getHours(), min = date.getMinutes(),
		sec = date.getSeconds(), dmy = `${day}/ ${month}/ ${year}`,
		hm = `${hour}:${min}:${sec}`
	res.send(
		{
			iduser: iduser,
			username: user,
			comment: comment,
			Date: dmy,
			Time: hm
		}
	)
	// res.set('Content-Type', 'text/html');
	// res.send(Buffer.from('<h2>Test String</h2>'));
	// res.redirect(`/Feedback${idfood}`)
})

app.use(express.static('./public_html'))
 app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
