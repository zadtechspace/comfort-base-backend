const nodemailer = require("nodemailer")

const dotenv = require("dotenv")

dotenv.config()


console.log(process.env.APP_KEY)
console.log(process.env.APP_MAIL)


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "oppo159351@gmail.com",
    pass: "tpcd svbo wbkh cibe",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


module.exports = transporter