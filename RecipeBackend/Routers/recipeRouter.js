const express=require("express")
const recipeRouter = express.Router();
const recipeController=require("../controllers/recipeController")
recipeRouter.get('/recipe', recipeController.getRecipes)
recipeRouter.post('/recipe', recipeController.postRecipes)
module.exports=recipeRouter