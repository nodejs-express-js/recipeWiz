const express=require("express")
const recipeRouter = express.Router();
const recipeController=require("../controllers/recipeController")


recipeRouter.post('/fetchrecipes', recipeController.getRecipes)
recipeRouter.post('/chefInfo',recipeController.getChefInfo)
module.exports=recipeRouter