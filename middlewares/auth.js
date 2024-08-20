
const { getUserWithId } = require("../service/auth")


async function restrictToLoggedInUserOnly(req,res,next){
    const userCookie = req.cookies?.Token;

    if(!userCookie) return res.redirect("/login");
    const user = getUserWithId(userCookie); 
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req,res,next){
    const userCookie = req.cookies?.Token;
    const user = getUserWithId(userCookie); 
    // console.log(user);
    req.user = user;
    next();
}



module.exports = {restrictToLoggedInUserOnly,checkAuth,};