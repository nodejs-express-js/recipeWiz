const express=require("express")
const chefRouter=express.Router();
const {login,signup}=require("../controllers/chefController")

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg") {
          cb(null, true); // Accept the file
        } else {
          cb(new Error("Only JPG images are allowed!")); // Reject the file
        }
      },
    
 })



chefRouter.post("/signup",upload.single('profilepic'),signup)
chefRouter.post("/login",login)


module.exports=chefRouter;