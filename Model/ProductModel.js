
const mongoose = require('mongoose')

const dotenv = require("dotenv")

dotenv.config()


const productSchema = mongoose.Schema[{
   Title:{type:String, required:true,trim:true,},
   Price:{type:String, required:true,trim:true},
   Catergory:{type:String, required:true,trim:true},
   image:{
    type:String,
    // unique:true
   }

}]


