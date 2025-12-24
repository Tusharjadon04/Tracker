const express =require("express");
const { registerUser, loginUser,updateUser,deleteUser } =require("../Middleware/Usermiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/userupdate",updateUser);
router.post("/deleteuser", deleteUser);

module.exports= router;
