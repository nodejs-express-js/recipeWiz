const {Chef,Recipe}=require("../models/index")
const {GetObjectCommand,S3Client,PutObjectCommand}=require("@aws-sdk/client-s3")
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner")
const { v4: uuidv4 } = require('uuid');
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
});
const expirationTime = 60*60*24*process.env.EXPIRY_TIME;


const getAllPosts=async(req,res)=>{
    try{
        const {num1,num2}=req.body;
       
        const offset = parseInt(num1, 10); // Starting index for the range
        const limit = parseInt(num2, 10) - parseInt(num1, 10) + 1; // Calculate the number of recipes to fetch
        if (isNaN(offset) || isNaN(limit) || offset < 0 || limit <= 0) {
          return res.status(400).json({ message: "Invalid range values" });
        }
        const recipes = await Recipe.findAll({
          where: {
            chefId: req.chefId, // Filter recipes by chefId
          },
          order: [["createdAt", "DESC"]],
          offset,
          limit,
          include: [
            {
              model: Chef, // Assumes there's a relation between Recipe and Chef
              as: "chef",
              attributes: ["id", "firstName", "lastName", "profilepic"], // Adjust fields to include only the ones you need
            },
          ],
        });
        if(recipes.length===0){
            return res.status(404).json({message:"No recipes found"})
        }
        const commandforPic = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME, 
          Key: recipes[0].dataValues.chef.profilepic,
        });
        const signedUrlforPic=await getSignedUrl(s3,commandforPic,{expiresIn:expirationTime})

          for(let i=0;i<recipes.length;i++) {
            const command = new GetObjectCommand({
              Bucket: process.env.POST_BUCKET_NAME, 
              Key: recipes[i].dataValues.image,
            });
            const signedUrl=await getSignedUrl(s3,command,{expiresIn:expirationTime})
            recipes[i].dataValues.image=signedUrl;
            recipes[i].dataValues.chef.profilepic=signedUrlforPic;
          }
        res.status(200).json(recipes)
    }
    catch(err){
        res.status(500).json({message:"something went wrong with server"})
    }
}

const postRecipes=async(req,res)=>{
    try{
        const {title ,description,ingredients,instructions}=req.body;
        console.log(title ,description,ingredients,instructions)
        if(!title ||!description ||!ingredients ||!instructions){
            return res.status(400).json({message:'Please provide all the required fields'})
        }
        if (!req.file) {
          return res.status(400).json({ message: 'File is missing in the multipart form.' });
        }
        if (req.file.size > 3 * 1024 * 1024) {
          return res.status(400).json({ error: "File size exceeds 3MB limit." });
        }
        if (!["image/jpeg"].includes(req.file.mimetype)) {
          return res.status(400).json({ error: "File is not a JPG image." });
        }
        const uuid=uuidv4();
        const key = `${uuid}.jpg`;
        const command = new PutObjectCommand({
            Bucket: process.env.POST_BUCKET_NAME,
            Key: key,
            Body: req.file.buffer,
        });
        const resonse=await s3.send(command);
        const recipe=await Recipe.create({title,description,ingredients,instructions,chefId:req.chefId,image:key})

        
        const lastRecipe = await Recipe.findOne({
          where: { chefId: req.chefId }, // Optional, filter by the current chef if needed
          include: [
            {
              model: Chef,
              as: "chef",
              attributes: ["id", "firstName", "lastName", "profilepic"], // Specify the fields you want
            },
          ],
          order: [["createdAt", "DESC"]], // Sort by createdAt in descending order to get the latest
        });
        const getcommand1 = new GetObjectCommand({
          Bucket: process.env.POST_BUCKET_NAME, 
          Key: key,
        });
        const getcommand2 = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME, 
          Key:lastRecipe.chef.profilepic ,
        })
        const signedUrl1=await getSignedUrl(s3,getcommand1,{expiresIn:expirationTime})

        const signedUrl2=await getSignedUrl(s3,getcommand2,{expiresIn:expirationTime})
        lastRecipe.image=signedUrl1;
        lastRecipe.chef.profilepic=signedUrl2;
        res.status(200).json(lastRecipe)
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
}



const deleteAPost = async(req,res)=>{
    try{
      console.log(req.params.id)
      let delpost=parseInt(req.params.id)
      const recipe=await Recipe.findByPk(delpost)
      if(!recipe){
        return res.status(404).json({message:"No recipe found"})
      }
      await recipe.destroy()
      res.status(200).json({message:"Recipe deleted successfully"})
    }
    catch(err){
        res.status(500).json({message:"something went wrong with server"})
    }
}
module.exports={getAllPosts,postRecipes,deleteAPost}