const express = require('express');
const app=express();
const chefRouter=require("./Routers/chefRouter")
const chefProtectorMiddleware=require("./MiddleWare/chefProtectorMiddleware")
require('dotenv').config()
const {sequelize}=require("./models");
const recipeRouter=require("./Routers/recipeRouter")
const chefPublicInfoRouter=require("./Routers/chefPublicInfoController") 
app.use(express.json());

app.use(process.env.PREFIX+"/",chefRouter)

app.use(process.env.PREFIX,chefPublicInfoRouter)
app.use(process.env.PREFIX+"/protected",chefProtectorMiddleware)
app.use(process.env.PREFIX+"/protected",recipeRouter)




app.listen(process.env.PORT||8080,async()=>{
    await sequelize.authenticate();
    console.log(`Server is running on port ${process.env.PORT}`)
})