const express=require("express")
const recipeRouter = express.Router();
const recipeController=require("../controllers/recipeController")
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

recipeRouter.post('/fetchrecipes', recipeController.getRecipes)
recipeRouter.post('/recipe',upload.single('postimage'), recipeController.postRecipes)
module.exports=recipeRouter