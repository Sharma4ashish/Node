const express = require("express");
const  { handleGenRedirectUrl } = require("../controllers/url");
const router = express.Router();

const urlModel =require("../models/url")





router.post("/",handleGenRedirectUrl);

router.get("/",async (req,res)=>{
    const AnalyticData = await urlModel.find({});
    res.render("url",{
        test : "URL Shortner",
        data : AnalyticData,

    });
})


module.exports = router;