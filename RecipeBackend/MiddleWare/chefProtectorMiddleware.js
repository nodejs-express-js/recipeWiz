const jsonwebtoken=require("jsonwebtoken");
const chefProtectorMiddleware=async(req,res,next)=>{
    try{
        const headers=req.headers;
        if(!headers["authorization"]){
            return res.status(401).json({error:"Unauthorized Access"})
        }
        let token=headers["authorization"].split(" ")
        if(token[0]!=="Bearer"){
            return res.status(401).json({error:"Invalid token"})
        }
        
        const verifiedInfo=jsonwebtoken.verify(token[1],process.env.JWT_SECRET)
        
        if(!verifiedInfo){
            return res.status(401).json({error:"Invalid token"})
        }
        req.chefId=verifiedInfo.id;
        next();
    }
    catch(err){
        res.status(401).json({error:"Unauthorized Access"})
    }
}

module.exports=chefProtectorMiddleware;