        const userModel = require("../Model/User.model")


      


const getAllUsers = async(req, res)=>{
                
        
        try {
                const user = await userModel.find()
                console.log(user)
                if (!user) {
                        return res.status(404).json({
                                success:false,
                                message:"Unable to fetch Users"
                        })
                        
                }

                res.status(200).json({
                        sucess:true,
                        message:"All Users fetched successfully",
                        user
                })
        } catch (error) {
                
        }
       
}
const getUserId = async(req, res)=>{
        const {_id}= req.params
        
        try {
                const user = await userModel.findById(_id)
                console.log(user)
                if (!user) {
                        return res.status(404).json({
                                success:false,
                                message:"Unable to fetch User"
                        })
                        
                }

                res.status(200).json({
                        sucess:true,
                        message:"User fetched successfully",
                        user
                })
        } catch (error) {
                
        }
       
}

const deleteById = async(req, res)=>{
        const {_id}= req.params
        
        try {
                const user = await userModel.findByIdAndDelete(_id)
                console.log(user)
                if (!user) {
                        return res.status(404).json({
                                success:false,
                                message:"Unable to fetch User"
                        })
                        
                }

                res.status(200).json({
                        sucess:true,
                        message:"User deleted successfully",
                        user
                })
        } catch (error) {
                
        }
       
}


const getOneUser = async(req, res)=>{
        const {email} = req.body

        try {
              const user =   await userModel.findOne({email})
              if(!user){
                return res.status(404).json({
                        success:"false",
                        message:"User Not Found"
                })
               
                
              }
             
               res.status(200).json({
                        success:"true",
                        message:"User Found Successfully",
                        user
                })

                 


                console.log
        } catch (error) {
                console.log(error)
        }
}

const updateUser = async(req, res)=>{
        const {_id} = req.params()

        try {
              const user =   await userModel.findByIdAndUpdate(_id, req.body)
              if(!user){
                return res.status(404).json({
                        success:"false",
                        message:"User Not Found"
                })
               
              }

               res.status(200).json({
                        success:"true",
                        message:"User Updated Successfully",
                        user
                })
        } catch (error) {
                console.log(error)
        }
}

module.exports = {getAllUsers,getUserId,deleteById,getOneUser,updateUser}