const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true },

    lastName:{type:String,required:true },

    email:{type:String,required:true,unique:true },

    password:{type:String,required:true },

    gender:{type:String, enum:["male", "female"]},

    age:{type:Number },

    isVerfied:{type:Boolean, default: false},

    isSubscribed:{type:Boolean, default: false},

    plan:{type: String, enum:["free", "basic","pro",'proplus'], default:"free"},

    verificationToken: {
        type: String,
        default: null
    },
    verificationExpire: {
        type: Date, // 10-9-2025-09-53
        default: null
    },
   
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel