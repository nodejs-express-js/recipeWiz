const express=require("express")
const chefRouter=express.Router();
const {login,signup}=require("../controllers/chefController")

chefRouter.post("/signup",signup)
chefRouter.post("/login",login)


module.exports=chefRouter;