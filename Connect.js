import mysql from 'mysql2'
import doenv from 'dotenv'


doenv.config()


export class PoolOf_conn {
    constructor(host, user, pass, database) {
        this.host = host
        this.user = user
        this.pass = pass
        this.database = database
    }
}

export function MakePool(pool) {
    // a = new PoolOf_conn

    const Pool = mysql.createPool({
        host: pool.host,
        user: pool.user,
        password: pool.pass,
        database: pool.database,

    }).promise()
    return Pool
}

export async function SELECT(a) {
    const [rs] = await a.query("SELECT * FROM user_table")
    return rs

}

export async function GetUser(pool, iduser) {
    const [rs] = await pool.query("SELECT * FROM user_table WHERE IDUser = ?", [iduser])
    return rs[0]

}
export async function SigntUp(pool, name, pass, mail, tel) {
    const sql = "INSERT INTO user_table(User_name,Mail,Phone,Pass) VALUES (?,?,?,?)"
    await pool.query(sql, [name, mail, tel, pass])
    console.log("inserted")
}

export async function Login(a, name, pass) {

    const [rs] = await a.query("SELECT COUNT(*) FROM user_table WHERE User_name = ?AND Pass = ?", [name, pass])
    return parseInt(rs[0]['COUNT(*)'])
}

export async function Food_List(pool) {
    const qr = "SELECT * FROM food "
    const [rs] = await pool.query(qr)
    return rs;
}
export async function Food(pool, idfood) {
    const qr = "SELECT * FROM food WHERE IDFood = ? ; "
    const [rs] = await pool.query(qr, [idfood])
    return rs;
}
export async function Food_Types(pool) {
    const qr = "SELECT Type FROM type_of_food "
    const [rs] = await pool.query(qr)
    return rs;
}
export async function Types(pool) {
    const qr = "SELECT * FROM type_of_food "
    const [rs] = await pool.query(qr)
    return rs;
}
export async function GETidUser(pool, name) {
    const qr = "SELECT IDUser FROM user_table WHERE User_name = ? "
    const [rs] = await pool.query(qr, [name])
    if (rs && rs.length > 0) {
        return rs[0].IDUser;
    } else {
        return -1;
    }
}

export async function addCart(pool, nameID, foodID) {
    const check = "SELECT * FROM cart WHERE UserID = ? AND IDFood = ?  "
    const [rs] = await pool.query(check, [nameID, foodID])
    const flag = rs.length
    let quantity = 0//số lượng
    let arr_Food = await Food_List(pool)//lôi data từ bảng food ra 
    let price = arr_Food[foodID - 1].Price//lôi đơn giá theo idfood 
    let total //tổng giá
    if (flag === 0) {
        quantity = 1
        total = price * quantity
        let values = [nameID, foodID, quantity, price, total]
        const intoCart = `INSERT INTO cart(UserID,IDFood,Amount,Price,Total) 
        VALUES (?,?,?,?,?)`
        await pool.query(intoCart, values)
    }
    if (flag === 1) {
        quantity = rs[0].Amount + 1
        total = price * quantity
        let values = [quantity, total, nameID, foodID]
        const UpdateCart =
            `UPDATE cart 
        SET Amount = ? , Total = ? 
        WHERE UserID = ? AND IDFood = ?`
        await pool.query(UpdateCart, values)
    }


}
export async function GetCart(pool, idUser) {
    const sql =
        `SELECT cart.UserID,Food,cart.IDFood,cart.Price,cart.Amount,img_src,Total 
    FROM cart INNER JOIN food ON cart.IDFood = food.IDFood 
    INNER JOIN user_table ON cart.UserID = user_table.IDUser 
    WHERE cart.UserID = ?;`
    const [rs] = await pool.query(sql, [idUser])
    return rs
}

export async function GetPrice(pool, idfood) {
    const getgia = `
    SELECT Price FROM food WHERE IDFood=? ;`
    const [rs] = await pool.query(getgia, [idfood])
    return rs[0].Price
}
// const pool = new PoolOf_conn (process.env.HOST , process.env.USER , process.env.PASS,process.env.DB)

export async function deleteFromCart(pool, iduser, idfood) {
    const del = `
    DELETE FROM cart 
    WHERE UserID = ? AND IDFood = ?;`
    await pool.query(del, [iduser, idfood])
}

export async function SavetheChange(pool, iduser, idfood, quantity) {
    var price = await GetPrice(pool, idfood)
    var total = price * quantity
    const save =
        `UPDATE cart 
        SET Amount = ? , Total = ? 
        WHERE UserID = ? AND IDFood = ?`
    var values = [quantity, total, iduser, idfood]
    await pool.query(save, values)
    // console.log(price)
    // console.log(total)
}

export async function SavetheCom(pool, iduser, food, comment) {
    const savethis = `
    INSERT INTO comment(IDUser,IDFood,Comment) 
    VALUES (?,?,?);`
    let value = [iduser, food, comment]
    await pool.query(savethis, value)

}

export async function showComment(pool, idfood) {
    const show = "SELECT idBL,`comment`.`IDUser`,`comment`.`IDFood`,`user_table`.`User_name`,`food`.`Food`,Comment,Date FROM `comment` INNER JOIN `food` ON `comment`.`IDFood`= `food`.`IDFood` INNER JOIN `user_table` ON `comment`.`IDUser` = `user_table`.`IDUser` WHERE `comment`.`IDFood` = ?;"
    const [rs] = await pool.query(show, [idfood])
    return rs
}

export async function generalOrder(pool, iduser, address, payment) {
    const insert = `
    INSERT INTO general_info_order(IDUser,Address,Payment) 
    VALUES (?,?,?);`
    let value = [iduser, address, payment]
    await pool.query(insert, value)

}
export async function getLatestorder(pool, iduser) {
    const sql = `SELECT * FROM general_info_order WHERE IDUser = ? 
    ORDER BY IDOrder DESC LIMIT 1;
    `
    const [rows] = await pool.query(sql, [iduser]);
    return rows[0].IDOrder

}
export async function SingleorderDetail(pool, iduser, idfood, amount) {
    var IDOrder = await getLatestorder(pool, iduser)
    var food = await Food(pool, idfood)
    var value = [IDOrder, idfood, amount, food[0].Price]
    const insert = `
    INSERT INTO order_detail(IDOrder,IDFood,Amount,Price)
    VALUES(?,?,?,?) ;`
    await pool.query(insert, value);

}
export async function updateFoodAmount(pool, idfood, amount) {
    const food = await Food(pool, idfood)
    const amountAfter = food[0].Amount - amount
    // console.log(amountAfter);
    if (amountAfter < 0) {
        return -1
    }
    else {
        const update = `UPDATE food SET Amount=? WHERE IDFood=?;`
        let value = [amountAfter, idfood]
        await pool.query(update, value)
        return 1
    }
}
export async function BuyAll(pool, arr2D) {
    var sql = "INSERT INTO order_detail(IDOrder,IDFood,Amount,Price) VALUES ?";
    await pool.query(sql, [arr2D])
}
export async function deleteCart(pool, iduser) {
    var del = `DELETE FROM cart WHERE UserID = ?`
    await pool.query(del,[iduser])
}

export async function SoldAmount(pool){
    var Sold = `
    SELECT \`order_detail\`.\`IDFood\`,\`food\`.\`Food\`,
    SUM(\`order_detail\`.\`Amount\`) AS soldAmount 
    FROM \`order_detail\` JOIN \`food\` 
    ON \`food\`.\`IDFood\` = \`order_detail\`.\`IDFood\`
    GROUP BY \`order_detail\`.\`IDFood\`
    `
    var [rs] = await pool.query(Sold)
    return rs
}
export async function typeFoodSold(pool){
    var sql = `
    SELECT type_of_food.Type, food.TypeID , COUNT(food.TypeID) AS SoldAmount
    FROM order_detail JOIN food 
    ON order_detail.IDFood = food.IDFood 
    JOIN type_of_food 
    ON food.TypeID = type_of_food.IDType 
    GROUP BY food.TypeID;`
    var [rs] = await pool.query(sql)
    return rs
}
export async function Sold_by_Date(pool){
    const sql = `SELECT Date(general_info_order.Date) AS Date,SUM(order_detail.Amount)AS Amount 
    FROM general_info_order
    JOIN order_detail ON general_info_order.IDOrder = order_detail.IDOrder
    GROUP BY date(general_info_order.Date);`
    var [rs] = await pool.query(sql)
    return rs 
}
export async function upDateFood(){
    
}