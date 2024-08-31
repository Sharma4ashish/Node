const express = require("express");
const urlRouter = require("./Routes/url"); 
const jwt = require("jsonwebtoken");
const ConnectToMongooDb = require("./dbConnection");
const urlModel= require("./models/url")
const cookieParser = require('cookie-parser')


const userRouter = require("./Routes/user")



const path = require("path");
const staticRouter = require("./Routes/staticRouter");
const {checkForAuthentication,restrictToRoles} = require("./middlewares/auth");

const app = express();
const PORT = 8000;

// Connect to MongoDB
ConnectToMongooDb("mongodb://127.0.0.1:27017/NewTest")
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.error("MongoDB connection error:", error));




// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

app.use(checkForAuthentication);


//Ejs Engine 
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));



// Routes
app.use("/url",restrictToRoles(["ADMIN"]) ,urlRouter);
app.use("/",staticRouter);
app.use("/user", userRouter);



app.get("/url/:reqId", async (req, res) => {





    const reqId = req.params.reqId;

    const entry = await urlModel.findOneAndUpdate({ 
    
        shortID: reqId },
    {
        $push:{
             visitHistory:{
                timestamps: Date.now(),
            }, 
        }

    });

    if (entry) {

        res.redirect(entry.redirectUrl);
        
    }
    else{
        res.json({error: "Your Id is not Correct "  })
    }


        
    
});


// app.get("/",async (req,res)=>{
//     const AnalyticData = await urlModel.find({});
//     res.render("home",{
//         test : "test",
//         data : AnalyticData,

//     });
// })


// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
