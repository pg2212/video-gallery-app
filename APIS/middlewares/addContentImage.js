const cloudinary = require("cloudinary").v2
const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")
require("dotenv").config()

// configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

//configure cloudinarystorage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async(req,videoPic)=>{
    return {
        folder:'VideoGalleryFolder',
        public_key: videoPic.fieldname+'-'+ Date.now()
    }
    }
})

// configure multer
const multerObj = multer({storage:clStorage})

module.exports = multerObj;