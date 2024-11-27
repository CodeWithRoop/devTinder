const express = require("express");
const app=express();

//mutiple route handling
app.use("/user",
    (req,res,next)=>{
        console.log("handling the route user!!");  //request handler
        next();
    },
    (req,res,next)=>{
        console.log("handling the route user1!!");
        next();
    },


    (req,res,next)=>{
        console.log("handling the route user2!!");
        next();
    },

    (req,res,next)=>{
        console.log("handling the route user4!!");
        res.send("user3 response");
    }

);

    
//app.use("/test",(req,res)=>{res.send("USE handler tested!order matters in routing")});

//app.get("/test",(req,res)=>{res.send("get API tested")});
//app.post("/test",(req,res)=>{res.send("post API tested!")});
//app.delete("/test",(req,res)=>{res.send("delete API tested!")});

//app.get("/test1/:userID/:userPassword",(req,res)=>{
    //console.log(req.query);

    //dynamic routing :userId:password
    //console.log(req.params);
    //res.send("get API tested")});



app.listen(3002,()=>{
    console.log("server is successfully listening on port 3002...");
});