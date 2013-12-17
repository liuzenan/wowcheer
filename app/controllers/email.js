/*Sending mail controller*/
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var transport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "elleryjiao@gmail.com"
    }
});

// boilerplate mail option
var mailOption = {
    from: "elleryjiao@gmail.com",
    subject: "Hello world!",
    text: "Plaintext body"
}

var sendMail = function(){


}


module.exports.sendMail = sendMail;