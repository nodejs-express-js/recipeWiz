const { Chef } = require("../models");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator=require("validator");
const { S3Client, PutObjectCommand,GetObjectCommand } = require("@aws-sdk/client-s3");
const {getSignedUrl }=require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config()

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
});
const expirationTime = 60*60*24*process.env.EXPIRY_TIME;



const signup=async(req,res)=>{
try{
    let {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName || !email || !password ){
        return res.status(400).json({message:'Please provide all required fields'})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message:'Invalid email format'})
    }
    if(validator.isStrongPassword(password)){
        return res.status(400).json({message:'Password must be at least 8 characters long and contain only alphanumeric characters'})
    }
    if (req.file.size > 3 * 1024 * 1024) {
        return res.status(400).json({ error: "File size exceeds 3MB limit." });
    }
    if (!["image/jpeg"].includes(req.file.mimetype)) {
        return res.status(400).json({ error: "File is not a JPG image." });
    }
    const existschef=await Chef.findOne({where:{email}});
    if(existschef){
        return res.status(400).json({message:'Email already exists'})
    }
    const uniqueId = uuidv4();
    const key = `${uniqueId}.jpg`;
    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype, // Adjust for actual file type
    });
    const response = await s3.send(command);
    password=await encryptpassword(password);
    const chef=await Chef.create({firstName,lastName,email,password,profilepic:key})
    const getcommand = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key
    });
    const url = await getSignedUrl(s3, getcommand, { expiresIn: expirationTime });
    const token=await generateToken(chef.id);
    res.status(200).json({email:chef.email,token,profilepic:url});
}
catch(err)
{
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
        const getcommand = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: existschef.profilepic
          });
          const url = await getSignedUrl(s3, getcommand, { expiresIn: expirationTime });

        const isMatch=await bcrypt.compare(password,existschef.password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid email or password'})
        }
        const token=await generateToken(existschef.id);
        res.status(200).json({email:existschef.email,token,profilepic:url})
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