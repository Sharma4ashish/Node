const express = require("express");
const  { handleGenRedirectUrl } = require("../controllers/url");
const staticRouter = express.Router();
const urlModel = require("../models/url");
const user = require("../models/user");
const {restrictToRoles} = require("../middlewares/auth");


staticRouter.get("/myurls",restrictToRoles(["NORMAL","ADMIN"]) ,async (req,res)=>{
    const AnalyticData = await urlModel.find({createdBy:req.user._id});
    return res.render("home",{
        test : "URL Shortner",
        data : AnalyticData,  

    });
})

staticRouter.get("/",(req,res)=>{
    return res.send("This is Home Page Open For Everyone")
})
staticRouter.get("/signup",(req,res)=>{
    return res.render("signup");
});
staticRouter.get("/login",(req,res)=>{
    return res.render("login");
});

module.exports = staticRouter;