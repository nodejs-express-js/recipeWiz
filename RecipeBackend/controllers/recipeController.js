const {Chef,Recipe}=require("../models/")

const getRecipes=async(req,res)=>{
try{
    const recipes = await Recipe.findAll({
        limit:10
      });
    res.status(200).json(recipes)
}
catch(error){
    res.status(500).json({message:"Server Error"})
 }
}

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