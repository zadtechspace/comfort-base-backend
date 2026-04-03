const  express = require('express')

const app = express()

app.use(express.json())

const dotenv = require('dotenv')

dotenv.config()

const cors = require("cors")
const sendWelcomeMail = require('./Mailtemplates/Welcomemail')

const connectdb = require ('./configDb/configdb')

connectdb()


require("./configDb/nodemailer")



const userRouter = require('./Routes/User.routes')

const authRouter = require('./Routes/Auth.routes')

const cartRouter = require("./Routes/Cart.route")
const productRouter = require('./Routes/Product.route')

    

const PORT = process.env.PORT

const URL = process.env.URL







// app.use(cors())


app.use(cors({
  origin: "*", // allow all (for now)
  credentials: true
}));
app.use(express.urlencoded({extended:true}))


app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/cart', cartRouter)
app.use('/product',productRouter)


app.get('/Welcome',(req,res)=>{
    res.send("Hello World")
})


app.listen(PORT,()=>{
   console.log(`App is running on port ${PORT}`)
})





