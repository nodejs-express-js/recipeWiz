const jwt=require("jsonwebtoken");
const chefProtectorMiddleware=async(req,res,next)=>{
    console.log("===============1")
    
    next();
}

module.exports=chefProtectorMiddleware;