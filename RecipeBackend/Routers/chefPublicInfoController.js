const express=require("express")
const chefPublicInfoRouter=express.Router();
const {Chef}=require("../models/")

chefPublicInfoRouter.get("/chefInfo",async(req,res)=>{
    try{
        const {id}=req.body;
      
        const chef=await Chef.findByPk(id);
        res.status(200).json({id:id,firstName:chef.firstName,lastName:chef.lastName,profilepic:chef.profilepic})
    }
    catch(err){
        res.status(500).json({message:"Server Error"})
    }

})

module.exports=chefPublicInfoRouter