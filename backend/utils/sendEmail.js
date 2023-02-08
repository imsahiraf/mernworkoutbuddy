const nodemailer = require("nodemailer");
const emailtransporter = require('./emailtransporter')
const emailoptions = require('./emailoptions');

module.exports = async (email, text) => {
  try {

    var transporter = nodemailer.createTransport(emailtransporter())

    var mailOptions = emailoptions(email, text)
  
    await transporter.sendMail(mailOptions, function(error){
      if (error) {
          console.log(error);
      }
    })

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}