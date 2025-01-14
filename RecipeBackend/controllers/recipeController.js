const {Chef,Recipe}=require("../models/")

const getRecipes = async (req, res) => {
    try {
      const { num1, num2 } = req.body; // Assuming num1 and num2 are passed as query parameters
      const offset = parseInt(num1, 10); // Starting index for the range
      const limit = parseInt(num2, 10) - parseInt(num1, 10) + 1; // Calculate the number of recipes to fetch
    console.log(req.body )
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
  
  
      res.status(200).json(recipes);
    } catch (error) {
        console.log(error);
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