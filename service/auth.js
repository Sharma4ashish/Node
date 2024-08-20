// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secretKey = "Ashish12345";

function setUserWithId(userDetails){
    return jwt.sign({
        email:userDetails.email,
        username:userDetails.username,
        _id:userDetails._id,
    },secretKey) 
}

function getUserWithId(Token){
    if(!Token) return null;
    try {
        return jwt.verify(Token ,secretKey)
        
    } catch (error) {
        return null;
        
    }

}



module.exports = {
    setUserWithId,
    getUserWithId,
    
}