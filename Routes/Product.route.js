const express = require("express")
const { addProduct, getallproduct, singleproduct } = require("../Controller/ProductController")
const isLogggedIn = require("../middlewares/isLoggedIn")
const productImageUploader = require("../middlewares/Productimageupload")


const productRouter = express.Router()


productRouter.post("/addproduct",isLogggedIn,(req,res,next)=>{
    productImageUploader.single("image")(req,res,(err)=>{
        if(err){
            console.log("Upload Error: ", err)
            return res.status(500).json({
                success: false,
                message: err.message || err || "Image upload failed"
            })
        }
        next()
    })
    },addProduct)
    
productRouter.get("/getallproduct",isLogggedIn, getallproduct)
productRouter.get("/singleproduct/:id",isLogggedIn, singleproduct)


module.exports = productRouter