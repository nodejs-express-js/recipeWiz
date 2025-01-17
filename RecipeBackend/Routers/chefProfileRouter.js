const express=require('express')
const chefProfileRouter=express.Router();
const chefProfileController=require("../controllers/chefProfileController")

chefProfileRouter.post("/getpostinfo",chefProfileController.getAllPosts)
chefProfileRouter.post("/createpost",chefProfileController.createAPost)
chefProfileRouter.post("/updatepost",chefProfileController.updateAPost)
chefProfileRouter.post("/deletepost",chefProfileController.createAPost)


module.exports=chefProfileRouter