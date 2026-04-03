const mongoose = require ("mongoose")

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"users"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "products"
    },

    
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        default: 1
        
      
    },
    productprice:{
        type: Number,
        
       
    },
    totalPrice:{
        type: Number
        
       
    },
    image:{
        type: String,
       
    },
    productId:{
        type: Number,
       
    }


})

cartModel = mongoose.model("carts",cartSchema)

module.exports = cartModel