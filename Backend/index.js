const bodyparser = require("body-parser");
const express=require("express")
const app= express();
const process =require("process")
const UserRoute = require("./Routes/UserRoute"); 
const ActivityRoute=require("./Routes/activityroutes")
const AIRoute = require("./Routes/Airoute");
const cors=require('cors')




app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); 
app.use('/api/ai', AIRoute);  
app.use('/api/users', UserRoute);
app.use('/api/activities', ActivityRoute);

require('dotenv').config()
require("./connection/cons")

app.listen(process.env.PORT,()=>{
    console.log(`hii mera db process kaam kar raha hai ${process.env.PORT}`);
})
app.use(ActivityRoute);
app.use(UserRoute);
app.use(AIRoute);


