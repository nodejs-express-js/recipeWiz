const {Chef,Recipe}=require("../models/")
const {GetObjectCommand,S3Client}=require("@aws-sdk/client-s3")
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner")

require("dotenv").config()
const expirationTime = 60*60*24*process.env.EXPIRY_TIME;

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
  });


const getRecipes = async (req, res) => {
    try {
      const { num1, num2 } = req.body; // Assuming num1 and num2 are passed as query parameters
      const offset = parseInt(num1, 10); // Starting index for the range
      const limit = parseInt(num2, 10) - parseInt(num1, 10) + 1; // Calculate the number of recipes to fetch
      if (isNaN(offset) || isNaN(limit) || offset < 0 || limit <= 0) {
        return res.status(400).json({ message: "Invalid range values" });
      }
      const recipes = await Recipe.findAll({
        order: [["createdAt", "DESC"]],
        offset,
        limit,
        include: [
          {
            model: Chef, // Assumes there's a relation between Recipe and Chef
            as: "chef", 
            attributes: ["id", "firstName", "lastName","profilepic"], // Adjust fields to include only the ones you need
          },
        ],
      });

     
      var chefprofilepics = new Map();

      for(let i=0;i<recipes.length;i++){
        
        if(chefprofilepics.has(recipes[i].dataValues.chef.dataValues.profilepic)){
          recipes[i].dataValues.chef.dataValues.profilepic=chefprofilepics.get(recipes[i].dataValues.chef.dataValues.profilepic)

        }
        else{
          const getcommand = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: recipes[i].dataValues.chef.dataValues.profilepic
          });
          const url = await getSignedUrl(s3, getcommand, { expiresIn: expirationTime });
          chefprofilepics.set(recipes[i].dataValues.chef.dataValues.profilepic,url)
          recipes[i].dataValues.chef.dataValues.profilepic=url;
        }
        
      }
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
const postRecipes=async(req,res)=>{
    try{
        const {title ,description,ingredients,instructions,image}=req.body;
        if(!title ||!description ||!ingredients ||!instructions ||!image){
            return res.status(400).json({message:'Please provide all the required fields'})
        }
        const recipe=await Recipe.create({title,description,ingredients,instructions,image,chefId:req.chefId})
        res.status(200).json(recipe)
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
}

module.exports ={getRecipes,postRecipes}