
const mongoose = require('mongoose')

const dotenv = require("dotenv")

dotenv.config()


const productSchema = mongoose.Schema({
   name:{
      type:String,
       required:true,
       trim:true,
       required:true},

   price:{
      type:Number,
      required:true,
      trim:true},

   category:{
      type:String,
      required:true,
      trim:true},

   Description: {
      type:String,
      trrim:true
     },

   image:{
    type:String},

   seller:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   }, 

},{
   timestamps:true
}
)

const productModel = mongoose.model("products", productSchema)


module.exports = productModel 

