const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
exports.suggest =async (req,res)=>{
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
    const prompt = req.body;
    try {
        const result = await model.generateContent(`${prompt.prompt}`);
        const response = await result.response;
        const text = response.text();
        res.status(200).json({text})
    } catch (error) {
        res.status(501).json({error:error.message})
    }
    
}