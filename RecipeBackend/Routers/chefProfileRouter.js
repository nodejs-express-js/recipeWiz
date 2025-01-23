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
chefProfileRouter.post("/createpost",upload.single('postimage'), (err, req, res, next) => {
  // Error-handling middleware
  if (err instanceof multer.MulterError) {
      // Multer-specific errors (e.g., file size limit)
      res.status(400).json({ message: err.message });
  } else if (err) {
      // Other errors (e.g., file type validation)
      res.status(400).json({ message: err.message });
  } else {
      next(); // Pass to the next middleware if no error
  }
},chefProfileController.postRecipes)
chefProfileRouter.delete("/deletepost/:id",chefProfileController.deleteAPost)


module.exports=chefProfileRouter