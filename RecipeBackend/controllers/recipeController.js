const {Chef,Recipe,Like}=require("../models/")
const {GetObjectCommand,S3Client,PutObjectCommand}=require("@aws-sdk/client-s3")
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner")
const { v4: uuidv4 } = require('uuid');

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
        const likes=await Like.count({
          where:{recipeId:recipes[i].id}
        })
        const liked = await Like.findOne({
          where: {
            recipeId: recipes[i].id,
            chefId: req.chefId,
          },
        });
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
        const getPostImageCommand = new GetObjectCommand({
          Bucket: process.env.POST_BUCKET_NAME,
          Key: recipes[i].dataValues.image,
        });
        const posturl = await getSignedUrl(s3, getPostImageCommand, { expiresIn: expirationTime });
        recipes[i].dataValues.image=posturl;
        recipes[i].dataValues.likes=likes;
        recipes[i].dataValues.isLiked=!!liked;
      }

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
};





module.exports ={getRecipes}