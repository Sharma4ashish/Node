const mongoose = require ("mongoose");


const ConnectToMongooDb = async function(url){
    return( await mongoose.connect(url));
    
}

module.exports = ConnectToMongooDb; 
