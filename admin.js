// npm run dev    
import express from 'express'
import doenv from 'dotenv'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import * as connect from './Connect.js'
import path from 'path'
import * as openAI from './openAI.js'

doenv.config()

const app = express()
app.set('view-engine', 'ejs')
app.set('views', './views.Admin')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const port = 3000


const Conn = new connect.PoolOf_conn(process.env.HOST, process.env.USER, process.env.PASS, process.env.DB)
const pool = connect.MakePool(Conn)
const luu = multer.diskStorage(
    {
        destination: "public_html/assets/imgs",
        filename: (req, file, cb) => {
            cb(null, "" + Date.now() + path.extname(file.originalname))
        }
    }
)
let upload = multer({ storage: luu })
app.get('/', async (req, res) => {
    var BQ = req.cookies.admin
    if (BQ === undefined) {
        return res.redirect("/login")
    }
    const sold = await connect.SoldAmount(pool)
    const type = await connect.typeFoodSold(pool)
    const date = await connect.Sold_by_Date(pool)
    console.log(date);
    const foods = await connect.Food_List(pool)
    res.render("index.ejs", {
        sold: sold,
        type: type,
        SoldDate: date,
        ListFood: foods
    })
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/AI', async (req, res) => {
    var chat = req.cookies.chat
    let data = req.body
    if (chat) {
      var history = JSON.parse(chat)
      history.push(data)
      var rs = await AI.GETfromAI(history)
      return res.send(rs)
    }
    
    // res.cookie('username', 'john doe', { maxAge: 3600})
    var arr = [data]
    var rs = await openAI.GETfromAI(arr)
    return res.send(rs)
  })
app.post('/check', async (req, res) => {
    var admin = req.body
    const rs = await connect.LoginAdmin(pool, admin.name, admin.pass)
    if (rs === 0) {
        console.log("signin fail")
        return response.redirect('/login')

    }
    if (rs === 1) {
        console.log("signin success")
        let options = {
            maxAge: 1000 * 60 * 60, // would expire after 60 minutes
            httpOnly: true, // The cookie only accessible by the web server
            // signed: true // Indicates if the cookie should be signed
        }
        res.cookie('admin', admin.name, options).redirect('/')

    }
})

app.get('/logout', (req, res) => {
    res.clearCookie('admin').redirect("/login")
})

app.post('/checkOrder',async(req,res)=>{
    let data = req.body,
    id = data.id,state =data.state
    console.log(data);
    await connect.stateUpdate(pool,parseInt( id),parseInt(state))
    res.send(`Checked`)
    
})

app.get('/newFood',async (req,res)=>{
    var BQ = req.cookies.admin
    if (BQ === undefined) {
        return res.redirect("/login")
    }
    res.render('newFood.ejs',{
        types: await connect.Types(pool)

    })
})
app.get('/orderControl', async(req,res)=>{
    var BQ = req.cookies.admin
    if (BQ === undefined) {
        return res.redirect("/login")
    }
    const orders = await connect.getDetail(pool)
    res.render("order.ejs", {
        order: orders
    })

})

app.post("/new", upload.single('img'), async (req, res) => {
    let food = req.body
    let name = food.Food
    let price = parseInt(food.Price)
    let amount = parseInt(food.Amount)
    let type = parseInt(food.type)
    let info = food.content
    let foodimg
    if (req.file === undefined) {
        foodimg = `assets/imgs/`
    } else{
        foodimg = `assets/imgs/${req.file.filename}`
    }
    

    // console.log(req.body);
    
    var rs = await connect.AddFood(pool,name,price,amount,type,info,foodimg)
    res.redirect('/') 
})

app.get('/Update:id', async (req, res) => {
    var BQ = req.cookies.admin
    if (BQ === undefined) {
        return res.redirect("/login")
    }
    let id = parseInt(req.params.id)
    var food = await connect.Food(pool, id)
    var types = await connect.Types(pool)
    res.render('change.ejs', {
        Food: food[0],
        types: types
    })
    console.log(food[0]);
})
app.post("/change", upload.single('img'), async (req, res) => {
    let food = req.body
    let id = food.idFood
    let name = food.Food
    let price = parseInt(food.Price)
    let amount = parseInt(food.Amount)
    let type = parseInt(food.type)
    let info = food.content
    let foodimg
    if (req.file === undefined) {
        foodimg = ''
    } else{
        foodimg = `assets/imgs/${req.file.filename}`
    }
    await connect.upDateFood(pool,id,name,price,amount,type,info,foodimg)
    
    res.redirect("/")
})
app.get('/Delete:id', async (req, res) => {
    let id = parseInt(req.params.id)
    connect.DeleteFood(pool,id)
    res.redirect('/')
})


app.use(express.static('./public_html.Admin'))
app.use(express.static('./public_html'))
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})
