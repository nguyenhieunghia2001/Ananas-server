const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false,//process.env.MAILER_SECURE, // true for 465, false for other ports
    auth: {
        user: process.env.MAILER_USER, // generated ethereal user
        pass: process.env.MAILER_PASSWORD, // generated ethereal password
    },
});

// send mail with defined transport object
exports.sendMail = async (email, subject, text, html) => {
    try {
        const content = await transporter.sendMail({
            from: '"Frond-End Khóa học online"', // sender address
            to: email, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });
        console.log('Message sent: ', content.messageId);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
};

module.exports = {transporter}