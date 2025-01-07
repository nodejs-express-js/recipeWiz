const express = require('express');
const app=express();
const chefRouter=require("./Routers/chefRouter")
const chefProtectorMiddleware=require("./MiddleWare/chefProtectorMiddleware")
require('dotenv').config()
const {sequelize}=require("./models")
app.use(express.json());

app.use("/",chefRouter)
app.use("/protected/",chefProtectorMiddleware)



app.listen(process.env.PORT||8080,async()=>{
    await sequelize.authenticate();
    console.log(`Server is running on port ${process.env.PORT}`)
})