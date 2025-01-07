const { Chef } = require("../models");
const bcrypt=require("bcrypt");

const signup=async(req,res)=>{
try{
    let {firstName,lastName,email,password,profilepic}=req.body;
    password=await encryptpassword(password);
    const chef=await Chef.create({firstName,lastName,email,password,profilepic})
    res.status(200).json({chef})
}
catch(err){
    res.status(500).json({error:err.message})
}
}



const login=async(req,res)=>{
    try{
        res.status(200).json({message:'login successful'})
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
}
module.exports={login,signup}




const encryptpassword=async(password)=>{
    const salt=await bcrypt.genSalt(12)
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword;
}