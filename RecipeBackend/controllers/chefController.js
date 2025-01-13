const { Chef } = require("../models");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator=require("validator");


const signup=async(req,res)=>{
try{
    let {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName || !email || !password ){
        return res.status(400).json({message:'Please provide all required fields'})
    }
    profilepic='';
    if(!validator.isEmail(email)){
        return res.status(400).json({message:'Invalid email format'})
    }
    if(validator.isStrongPassword(password)){
        return res.status(400).json({message:'Password must be at least 8 characters long and contain only alphanumeric characters'})
    }
    const existschef=await Chef.findOne({where:{email}});
    if(existschef){
        return res.status(400).json({message:'Email already exists'})
    }
    password=await encryptpassword(password);
    const chef=await Chef.create({firstName,lastName,email,password,profilepic})
    const token=await generateToken(chef.id);
    res.status(200).json({email:chef.email,token})
}
catch(err){
    res.status(500).json({message:err.message})
}
}




const login=async(req,res)=>{
    try{
        let {email,password}=req.body;
        if(!email ||!password){
            return res.status(400).json({message:'Please provide email and password'})
        }
        const existschef=await Chef.findOne({where:{email}});
        if(!existschef){
            return res.status(401).json({message:'Invalid email or password'})
        }
        const isMatch=await bcrypt.compare(password,existschef.password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid email or password'})
        }
        const token=await generateToken(existschef.id);
        res.status(200).json({email:existschef.email,token})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports={login,signup}



const generateToken=async(id)=>{
    const token=jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
    return token;
}
const encryptpassword=async(password)=>{
    const salt=await bcrypt.genSalt(12)
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword;
}