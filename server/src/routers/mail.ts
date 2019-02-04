import * as express from "express";
import * as nodemailer from "nodemailer";

export const mailerRouter = express.Router();


function sendError(res, status: number, message: string, error?: any) {
    console.error('ERROR', message, status);
    res.status(status);
    res.json({
        status: status,
        message: message,
        error: error
    });
}

mailerRouter.get('/test', (req, res) => {

    console.log('MAIL TEST');

    main()
        .then(result => res.json({ result }))
        .catch(err => sendError(res, 400, 'MAIL ERROR', err));

});


// async..await is not allowed in global scope, must use a wrapper
async function main(){


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'elcsiga@gmail.com', // generated ethereal user
            pass: '27esGoogle' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    const mailOptions = {
        from: 'elcsiga@gmail.com', // sender address
        to: "elcsiga@gmail.com", // list of receivers
        subject: "TEST MAIL", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
