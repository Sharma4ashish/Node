const shortiD = require("shortid");
const urlModel = require("../models/url");

async function handleGenRedirectUrl(req,res)  {
    const body = req.body;
    if (!body.url){
         return res.status(400).json({error : "url is Required"} )
    }
    const genShortID = shortiD(8);
    await urlModel.create({
        shortID:genShortID,
        redirectUrl:body.url,
        createdBy:req.user._id,
    });
    return res.render("home",{
        id:genShortID,
        
    });   
}
module.exports = { handleGenRedirectUrl,
}