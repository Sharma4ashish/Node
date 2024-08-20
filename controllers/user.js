const user = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const {setUserWithId,getUserWithId} = require("../service/auth")

async function handleUserSignUp(req,res){
    const {username, email,password} = req.body;
    await user.create({
        username,
        email,
        password,
    });

    return res.redirect("/");

}

const handleUserLogIn = async function(req,res) {
    const {email ,password} = req.body;
    const userDetails = await user.findOne({email,password});
    if(!userDetails){
        return res.render("login",{data: email})
    }
    // const userSessionId = uuidv4();
    const Token = setUserWithId(userDetails);
    res.cookie("Token",Token);

    return res.redirect("/");
}

 


module.exports ={ handleUserSignUp,
    handleUserLogIn,
};