
const express = require ("express")

const userRouter = express.Router()

const { getAllUsers,getUserId, deleteById, getOneUser, updateUser} = require('../Controller/User.controller')
const isSubscribed = require("../middlewares/isSubscribed")
const plan = require("../middlewares/plan")
// 
// const Register = require("../Controller/AuthController")

// UserRouter.post('/register', Register)
userRouter.get('/getAllUsers', getAllUsers)
userRouter.get('/:_id',isSubscribed,plan, getUserId)
userRouter.get('/singleUser', getOneUser)
userRouter.delete('/delete/:_id', deleteById)
userRouter.put('/update/:_id', updateUser)

// isSubscribed,plan,

module.exports = userRouter