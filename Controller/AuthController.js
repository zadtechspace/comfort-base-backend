const userModel = require("../Model/User.model")

const bcrypt = require("bcryptjs")

const generateString = require ('../Utilities/randomString')

const sendWelcomeMail = require('../Mailtemplates/Welcomemail')

const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../Model/blacklistedToken")
const sendVerificationEmail = require("../Mailtemplates/Verifymail")
const Forgotpasswordmail = require("../Mailtemplates/Forgotpasswordmail")
// const Forgotpasswordmail = require("../Mailtemplates/Forgotpasswordmail")






const Register = async(req, res)=>{
                const {password, firstName, email} = req.body
        
        try {    

                // hash the password
                const salt = await bcrypt.genSalt(10)

                const hashedpassword = await bcrypt.hash(password, salt)

                // Generate token

               const verificationToken = generateString(8)

               const forgotpasstoken = generateString(10)

                // generate expire time

                const verificationExpire = Date.now() + 1000*60*20

                const user = await userModel.create({...req.body, password:hashedpassword ,verificationToken, verificationExpire})
                if (!user) {
                    return res.status(404).json({
                        success:false,
                        message:"Unable to create User"
                    })
                    
                }
                
                res.status(200).json({
                    sucess:true,
                    message:"User created successfully",
                    user
                })
                console.log(user)
            
                
                sendVerificationEmail(firstName,email,verificationToken)
                sendWelcomeMail(firstName, email)
                
            } catch (error) {
                if(error.code === 11000){
                    return res.status(401).json({
                        success:false,
                        message:"Email already exist"
                    })
                }
                console.log(error)
            }

    }



    const login =async (req,res)=>{
        const {email, password} = req.body
        try {
              const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Email or Password is incorrect"
            })
        }
        const isCorrectedPassword = await bcrypt.compare(password, user.password)
        if(!isCorrectedPassword){
            return res.status(404).json({
                success:false,
                message:"Email or Password is incorrect"
            })
        }

        const token = jwt.sign({email, id:user._id},process.env.jwt_secret,{
             expiresIn: process.env.jwt_exp
        })

        res.status(200).json({
            success:true,
            token,
            user
        })
        // console.log(req.headers)
        } catch (error) {
            console.log(error)
        }
      
    }

    const logout= async (req, res)=>{
        const token = req.headers.authorization.split(" ")[1]
        try {
            await blacklistTokenModel.create({token})
            res.status(200).json({
                success: true,
                message: "logout successfully!"
             })
        } catch (error) {
            console.log(error)
        }

    }


    const verifydashboardToken =async (req,res)=>{
        
        try {
                let token;
                if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
                    token = req.headers.authorization.split(" ")[1]
                }
                if(!token){
                    return res.status(404).json({
                        success:false,
                        message:"Token is invalid"
                    })
                }

                const{email}= jwt.verify(token, process.env.jwt_secret)

                const isBlacklistedtoken =await blacklistTokenModel.findOne({token})
                if(isBlacklistedtoken){
                    return res.status(404).json({
                        success:false,
                        message:"Token has been blacklisted",
                    })
                }

                const user = await userModel.findOne({email})
                if(!user){
                    return res.status(404).json({
                        success:false,
                        message:"User not found"
                    })
                }

                res.status(200).json({
                    success:true,
                })
            } catch (error) {
                console.log(error)
                if(error.message === "jwt malformed"){return res.status(404).json({success:false, message:"Token is invalid"})}
                else if(error.message === "jwt expired"){return res.status(403).json({success:false, message:"Token has expired"})}
                else{ return res.status(400).json({ success: false, message: error.message || "something went wrong" })}
            }
    }

// const verificationUser = async(res, req)=>{
//         const {token} = req.body

//         if(!user){
//                 return res.status(404).json({
//                         success: false,
//                         message:"Token is invalid or has been verified"
//                 })
//         }

//         if(Date.now()> verificationExpire){
//               return  res.status(400).json({
//                         success:false,
//                         message:'Token has expired'
//                 })
//         }

        


// }

const finduserbyemail = async (req,res)=>{

    const {email} = req.body
     const forgottenpasswordtoken = generateString(8)
   
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
            
        }
        res.status(200).json({
            success:true,
            message:"User found successfully",
            user
        })
        
        console.log(user.firstName,email,forgottenpasswordtoken)
        Forgotpasswordmail(user.firstName,email,forgottenpasswordtoken)
        
    } catch (error) {
        console.log(error)
    }
    
    



}

const updatePasword = async(req,res)=>{
    const {forgottenpasswordtoken} = req.params
    const {password} = req.body

    console.log(forgottenpasswordtoken)

    // const token =forgotpasstoken
    try {
        const salt =await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)
     
        const user = await userModel.findOneAndUpdate({forgottenpasswordtoken},{ ...req.body,password:hashedpassword})
        
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Password reset not successful"
            })
        }

        res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })
    } catch (error) {
        console.log(error)
    }

}




const verificationUser = async (req, res) => {
          console.log(req.params)
    const { token } = req.params
    try {
        // find the user with the token
        const user = await userModel.findOne({ verificationToken: token })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Token is invalid or has been verified"
            })
        }

        // check if it hasn't expired
        if (Date.now() > user.verificationExpire) {
            return res.status(400).json({
                success: false,
                message: "Token has expired"
            })
        }

        // await userModel.findByIdAndUpdate(user._id, {verificationExp: null, verificationToken: null, isVerified: true})

        user.verificationToken = null
        user.verificationExpire = null
        user.isVerfied = true
        await user.save()

        res.status(200).json({
            success: true,
            message: "Account verified succesfully!"
        })
    } catch (error) {
        console.log(error)
    }
}




    module.exports = {Register ,verificationUser,login,logout,verifydashboardToken,finduserbyemail,updatePasword}