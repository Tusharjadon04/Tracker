const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mera  database se cnnnect ho gya hai jo karna hai karle ");
})
.catch((error)=>{
    console.log("some error occured",error);
})