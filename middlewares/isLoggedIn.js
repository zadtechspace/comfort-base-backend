const jwt = require("jsonwebtoken")

const userModel = require("../Model/User.model");
const blacklistTokenModel = require("../Model/blacklistedToken");

const isLogggedIn = async (req, res, next)=>{
   try {

    // checking if there's a token
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token= req.headers.authorization.split(" ")[1]
        }
        if(!token){

            return res.status(402).json({
                success:false,
                message:"Token is required"
            })
        }
    
        
        // to validate the accesstoken and expiration
        const {email} = jwt.verify(token,process.env.jwt_secret)
        // console.log(decoded)


        // checking if the token is blacklisted

        const isBlacklistedToken = await blacklistTokenModel.findOne({token})
        if(isBlacklistedToken){
            return res.status(403).json({
                success:false,
                message:"Token is invalid: blacklisted"
            })
        }
        // finding the user with the payload
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })


        }

        // modify the req onjects by adding the user

        req.user= user
        

         next()

   } catch (error) {
    console.log(error)
     if (error.message === "jwt malformed") {
            return res.status(400).json({ success: false, message: "Token is invalid" })
        } else if (error.message === "jwt expired") {
            return res.status(400).json({ success: false, message: "Token has expired. kindly login again" })
        } else {
            return res.status(400).json({ success: false, message: error.message || "something went wrong" })
        }
   }
   
}


// const isLogggedIn = async (req, res, next) => {
//     try {
//         let token;
//         //1. check if there's token
//         if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//             token = req.headers.authorization.split(" ")[1]
//         }

//         if (!token) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Token is required"
//             })
//         }

//         // 2. validate the token and its expiration
//         const { email } = jwt.verify(token, process.env.jwt_secret)
//         // console.log(decoded)

//         // 3. check if it has not been blacklisted
//         const isBlacklisted = await blacklistTokenModel.findOne({ token })
//         if (isBlacklisted) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Token is invalid: blacklisted"
//             })
//         }


//         // 4. Find the user with the payload
//         const user = await userModel.findOne({ email })
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         // 5. Modify the req object by adding the user
//         req.user = user
//         next()
//     } catch (error) {
//         console.log(error)
//         if (error.message === "jwt malformed") {
//             return res.status(400).json({ success: false, message: "Token is invalid" })
//         } else if (error.message === "jwt expired") {
//             return res.status(400).json({ success: false, message: "TOken has expired. kindly login again" })
//         } else {
//             return res.status(400).json({ success: false, message: error.message || "something went wrong" })
//         }
//     }
// }



module.exports = isLogggedIn