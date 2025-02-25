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
app.get('/', (req, res) => {
    res.sendStatus(200);  // Root health check for load balancer
  });
  app.get('/healthz', (req, res) => {
    res.sendStatus(200);  // Additional readiness probe endpoint
  });

app.use(process.env.PREFIX+"/",chefRouter)
app.use(process.env.PREFIX+"/protected",chefProtectorMiddleware)
app.use(process.env.PREFIX+"/protected",recipeRouter)
app.use(process.env.PREFIX+"/protected",chefProfileRouter)

app.use((req, res, next) => {
    res.status(404).json({ error: "Path not found" });
});


app.listen(process.env.PORT||8080,async()=>{
    await sequelize.authenticate();
    console.log(`Server is running on port ${process.env.PORT}`)
})