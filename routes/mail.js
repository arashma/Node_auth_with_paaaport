var nodemailer       = require('nodemailer');

var sendMail  = (from , to ,subject ,text ,callback)=>{
    var transporter = nodemailer.createTransport({ 
        service: 'gmail',
        host: "smtp.gmail.com",
        auth: {
          user: 'arashdevelopermind@gmail.com',
          pass: 'ARASH1371'
        }
        });
      var mailOptions = { from: from, to: to, subject:subject , text: text };
      transporter.sendMail(mailOptions,callback);
}

module.exports = {sendMail};