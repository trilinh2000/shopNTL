const mailer=require('nodemailer');
const configMailer=require('../config/configMailer');
require('dotenv/config');
module.exports.sendMail=(to,subject,htmlContent)=>{
    const transport=mailer.createTransport({
        host:configMailer.HOST,
        port:configMailer.PORT,
        secure:false,
        service:"Gmail",
        auth:{
            user:configMailer.USERNAME,
            pass:configMailer.PASSWORD
        }
    });
    const options={
        from:configMailer.FROM_ADDRESS,
        to:to,
        subject:subject,
        html:htmlContent
    };
    return transport.sendMail(options);
}