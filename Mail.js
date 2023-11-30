import nodemailer from 'nodemailer'
export function whereTosend(user,app_Pass){
    const fromMail = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:user,
            pass:app_Pass
        }
    
    })
    return fromMail
}


export async function sendNotifi(fromMail,userGmail,html){
    await fromMail.sendMail({
        from:process.env.Mail,
        to:userGmail,
        subject:'Notification',
        html:html
    })

}