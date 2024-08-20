const express = require("express");
const  { handleGenRedirectUrl } = require("../controllers/url");
const staticRouter = express.Router();
const urlModel = require("../models/url");
const user = require("../models/user");


staticRouter.get("/",async (req,res)=>{
    if(!req.user) return res.redirect("/login")
    const AnalyticData = await urlModel.find({createdBy:req.user._id});
    return res.render("home",{
        test : "URL Shortner",
        data : AnalyticData,  

    });
})
staticRouter.get("/signup",(req,res)=>{
    return res.render("signup");
});
staticRouter.get("/login",(req,res)=>{
    return res.render("login");
});

module.exports = staticRouter;