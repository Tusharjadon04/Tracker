const express =require("express");
const { suggest } = require("../Middleware/Aimodel");
const AIRoute = express.Router();

AIRoute.post("/HeyAIModel",suggest);
console.log(AIRoute);


module.exports=AIRoute;