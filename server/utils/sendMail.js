const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = async (mailTo, subject = 'АВТОВОКЗАЛЫ ДОНБАССА', html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.rambler.ru',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'info.donavto@ro.ru',
        to: mailTo,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.log(error.message)
        console.log('Message sent: %s', info.messageId)
    });
}