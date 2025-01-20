const express=require('express')
const chefProfileRouter=express.Router();
const chefProfileController=require("../controllers/chefProfileController")
const multer=require("multer");
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
chefProfileRouter.post("/getpostinfo",chefProfileController.getAllPosts)
chefProfileRouter.post("/createpost",upload.single('postimage'),chefProfileController.postRecipes)
chefProfileRouter.delete("/deletepost/:id",chefProfileController.deleteAPost)


module.exports=chefProfileRouter