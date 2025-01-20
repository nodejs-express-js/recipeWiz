const express=require("express")
const recipeRouter = express.Router();
const recipeController=require("../controllers/recipeController")


recipeRouter.post('/fetchrecipes', recipeController.getRecipes)
module.exports=recipeRouter