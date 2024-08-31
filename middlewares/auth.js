
const { getUserWithId } = require("../service/auth")



async function checkForAuthentication(req,res,next){
    const userCookie = req.cookies?.Token;

    if(!userCookie) return next() ;
    const user = getUserWithId(userCookie); 
    if(!user) return res.redirect("/login");

    req.user = user;
    return next();
}


function restrictToRoles (roles = []){
    return function (req,res,next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        next();
    }
}
 




// async function restrictToLoggedInUserOnly(req,res,next){
//     const userCookie = req.cookies?.Token;

//     if(!userCookie) return res.redirect("/login");
//     const user = getUserWithId(userCookie); 
//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next){
//     const userCookie = req.cookies?.Token;
//     const user = getUserWithId(userCookie); 
    
//     req.user = user;
//     next();
// }



module.exports = {checkForAuthentication,restrictToRoles,};