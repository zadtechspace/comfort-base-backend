
const express = require ("express")

const userRouter = express.Router()

const { getAllUsers,getUserId, deleteById, getOneUser, updateUser} = require('../Controller/User.controller')
const isLogggedIn = require("../middlewares/isLoggedIn")
const profileImageUploader = require("../middlewares/ProfileImageUploader")
// const isSubscribed = require("../middlewares/isSubscribed")
// const plan = require("../middlewares/plan")
// 
// const Register = require("../Controller/AuthController")

// UserRouter.post('/register', Register)
userRouter.get('/getAllUsers', getAllUsers)
userRouter.get('/:_id',isLogggedIn, getUserId)
userRouter.get('/singleUser', getOneUser)
userRouter.delete('/delete/:_id', deleteById)
userRouter.put('/update/:_id',isLogggedIn,(req,res,next)=>{
    profileImageUploader.single("profileImage")(req,res,(err)=>{
        if(err){
            return res.status(404).json({
                success:false,
                message:err.message
            })
        }
        next()
    })
}, updateUser)

// isSubscribed,plan,

module.exports = userRouter