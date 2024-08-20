const mongoose = require("mongoose");


const urlSchema=  new mongoose.Schema({
    shortID:{
        type : String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type : String,
        required : true,
    },
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    visitHistory:[
        {timestamps:{type:Number}}],

},{timestamps:true});

const urlModel = mongoose.model("url",urlSchema);

module.exports= urlModel;