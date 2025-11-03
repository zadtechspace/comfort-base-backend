const multer = require("multer")
const{cloudinarystorage} = require("multer-storage-cloudinary")
const cloudinary = require("../configDb/Cloudinary")


const storage = new cloudinarystorage({
    cloudinary,
    params:{}
})