const mongoose = require ("mongoose")

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        
      
    },
    productprice:{
        type: Number,
        
       
    },
    amount:{
        type: Number,
        
       
    },
    image:{
        type: String,
       
    }


})

cartModel = mongoose.model("cart",cartSchema)

module.exports = cartModel