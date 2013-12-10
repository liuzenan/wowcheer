var path           = require('path')
var templatesDir   = path.resolve(__dirname, '../../views/', 'templates')
var emailTemplates = require('email-templates');
var nodemailer     = require('nodemailer');


module.exports.sendTicketMail = function(data,callback) {
  var path           = require('path')
  var templatesDir   = path.resolve(__dirname, '../..', 'templates')
  var emailTemplates = require('email-templates');
  var nodemailer     = require('nodemailer');
  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      console.log(err);
    } else {
      // ## Send a single email
      // Prepare nodemailer transport object
      var transport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
          user: "ticketing@5-qu.com",
          pass: "5Qu5Qu.com"
        }
      });

      // An example users object with formatted email function
      var locals = {
        email: 'mamma.mia@spaghetti.com',
        name: {
          first: 'Mamma',
          last: 'Mia'
        }
      };

      // Send a single email
      template('newsletter', locals, function(err, html, text) {
        if (err) {
          console.log(err);
        } else {
          transport.sendMail({
            from: '我去网 <ticketing@5-qu.com>',
            to: locals.email,
            subject: '演出预售成功!',
            html: html,
            // generateTextFromHTML: true,
            text: text
          }, function(err, responseStatus) {
            if (err) {
              console.log(err);
              callback(err,null);
            } else {
              console.log(responseStatus.message);
              callback(null,responseStatus.message);
            }
          });
        }
      });
    }
  });
}
