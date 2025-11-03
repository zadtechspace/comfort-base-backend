const express = require("express")
const {Register,verificationUser, login, logout, finduserbyemail, updatePasword, verifydashboardToken} = require("../Controller/AuthController")
const isLogggedIn = require("../middlewares/isLoggedIn")

const authRouter = express.Router()

authRouter.post('/register', Register)
authRouter.post('/logout', isLogggedIn,logout)
authRouter.post('/verifytoken', verifydashboardToken)
authRouter.post('/login', login)
authRouter.post('/forgotpassword',finduserbyemail)
authRouter.post('/forgotpassword/:forgottenpasswordtoken',updatePasword)

authRouter.post("/verifyuser/:token", verificationUser)


module.exports = authRouter