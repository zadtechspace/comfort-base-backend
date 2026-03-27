const multer = require('multer');
const{CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require("../configDb/Cloudinary")

const storage = new CloudinaryStorage({
    cloudinary,
    params:async(req,file)=>({
        allowedFormats:["jpeg","jpg","png"],
        folder:"profileImage",
        transformation:[{width:400,height:400}]
    })
})

const profileImageUploader = multer({storage})

module.exports = profileImageUploader