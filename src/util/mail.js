const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,//true
    port: 587,
    auth: {
      user: 'prakashcsedyp@gmail.com',
      pass: 'PN@420gmail'
    }
  });

  
  const sendMail = (mailOptions) =>{
    
    return transporter.sendMail(mailOptions).then(result =>{
        return result
    }).catch(error =>{
        console.log(error);
    })
  }
  

module.exports = sendMail;