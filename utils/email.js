var nodemailer = require('nodemailer');
function sendEmail(recEmail){
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.mail.webchat.com',
        port: 25,
        auth: {
            user: "admin@webchat.com",
            pass: "Micdie2022!"
        }
      });

      var mailOptions = {
        from: 'admin@webchat.com',
        to: `${recEmail}`,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          
        } else {
          console.log('Email sent: ' + info.response);
          
        }
      });
      
}

module.exports = {
  sendEmail
 };

