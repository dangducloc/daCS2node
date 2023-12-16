
import doenv from 'dotenv' 


import * as u from './Connect.js'
import * as mail from './Mail.js'
doenv.config() 

const Conn = new u.PoolOf_conn (process.env.HOST , process.env.USER , process.env.PASS,process.env.DB)
const pool = u.MakePool(Conn)

const rs = await u.Sold_by_Date(pool)
console.log(rs);
try {
    console.log(rs);
} catch (error) {
    console.log(error.stack)
}

function getDaysArray(startDate, endDate) {
    for (var arr=[],dt=new Date(startDate); dt<=endDate; dt.setDate(dt.getDate()+1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }
  
  var startDate = rs[0].Date;
//   console.log(startDate);
  var endDate = rs[rs.length-1].Date;
  var daysArray = getDaysArray('2023-11-19T17:00:00.000Z', endDate);
  var nwArr = []
  for (let i = 0; i < daysArray.length; i++) {
    var date = daysArray[i]
    let a = 1
    for (let j = 0; j < rs.length; j++) {
        if(date.getTime() == rs[j].Date.getTime()){
            nwArr.push({Date:date,Amount:rs[j].Amount})
            a = 2  
            break
        }
    }
    if(a!==2){
        nwArr.push({Date:date,Amount:0}) 
    }
    
  }
// console.log(daysArray);
console.log(nwArr);
  

// const obj = JSON.parse(json)
// const general = [parseInt(obj.iduser),obj.Address,obj.paymentMethod]
// const amount = obj.amount
// const prce = obj.prce
// // console.log(prce[5]);
// let idfood = obj.idfood
// let row =[]
// const array2D = [];
// let len  =  amount.length
//     for (let index = 0; index < len; index++) {
//         row = [1,parseInt(idfood[index]),parseInt(amount[index]),parseInt(prce[index])]
//         array2D.push(row)
//     }
    
//     // console.log(array2D);
// var html = '' 
// for (let index = 0; index < array2D.length; index++) {
//     var [food] =await u.Food(pool,array2D[index][1])
//     var td = `<tr><td>${food.Food}</td><td>${amount[index]}</td><td>${prce[index]}</td></tr>`
//     html+=td
//     // console.log(td)
// }console.log(html);



// // for (let i = 0; i < numRows; i++) {
// //   array2D[i] = [];

// //   for (let j = 0; j < numCols; j++) {
// //     array2D[i][j] = i * numCols + j + 1;
// //   }
// // }






// // for (let i = 0; i < array2D.length; i++) {
// //     var row = ''
// //     for (let j = 0; j < array2D[i].length; j++) {
// //         row += array2D[i][j] + ' ';}console.log(row);}
// // const from = mail.whereTosend(process.env.Mail,process.env.app_Pass)
// // const html =`
// // <h1>Thank you for shopping with us!</h1>
// //     <p>We are pleased to inform you that your order has been successfully processed.</p>
// //     <p>Your order details:</p>
// //     <ul>
// //       <li>Product: White T-shirt</li>
// //       <li>Quantity: 2</li>
// //       <li>Total Value: $200</li>
// //     </ul>
// //     <p>You will receive an order confirmation email within 24 hours from now.</p>
// //     <p>Thank you for trusting and using our services!</p>
// // `
// // try {
// //    await mail.sendNotifi(from,"melpmelp002@gmail.com",html)
// //    console.log("sent!!!");
// // } catch (error) {
// //     console.error();
// // }

