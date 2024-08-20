const express = require("express");
const {handleUserSignUp,handleUserLogIn} = require("../controllers/user");

const userRouter = express.Router();



userRouter.post("/signup",handleUserSignUp);
userRouter.post("/login",handleUserLogIn);



module.exports  = userRouter;