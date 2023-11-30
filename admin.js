// npm run dev    
import express from 'express'
import doenv from 'dotenv'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import * as connect from './Connect.js'

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
app.get('/', async (req, res) => {
    const sold = await connect.SoldAmount(pool)
    const type = await connect.typeFoodSold(pool)
    const date = await connect.Sold_by_Date(pool)
    const foods = await connect.Food_List(pool)
    res.render("index.ejs", {
        sold: sold,
        type: type,
        SoldDate: date,
        ListFood: foods
    })
})
app.get('/Update:id', async( req, res)=>{
    let id = parseInt(req.params.id)
    var food = await connect.Food(pool,id)
    var types = await connect.Types(pool)
    res.render('change.ejs',{
        Food:food[0],
        types:types
    })
})
app.post("/change", async( req,res)=>{
    console.log(req.body,req.file);
})

app.use(express.static('./public_html.Admin'))
app.use(express.static('./public_html'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
