const express = require('express');
const app=express();
require('dotenv').config()
const cors=require("cors")


const chefRouter=require("./Routers/chefRouter")
const recipeRouter=require("./Routers/recipeRouter")
const chefProfileRouter=require("./Routers/chefProfileRouter")

const chefProtectorMiddleware=require("./MiddleWare/chefProtectorMiddleware")
const {sequelize}=require("./models");

app.use(express.json());
app.use(cors())


app.use(process.env.PREFIX+"/",chefRouter)
app.use(process.env.PREFIX+"/protected",chefProtectorMiddleware)
app.use(process.env.PREFIX+"/protected",recipeRouter)
app.use(process.env.PREFIX+"/protected",chefProfileRouter)




app.listen(process.env.PORT||8080,async()=>{
    await sequelize.authenticate();
    console.log(`Server is running on port ${process.env.PORT}`)
})