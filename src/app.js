const express = require("express");
const app=express();

const{adminAuth}=require("./middleware/auth");
app.use("/admin",adminAuth);

app.get("/admin/getAllData",(req,res)=>{
    console.log("all data sent");
        res.send("all data sent-using middleware-with seperate folder");
});

app.get("/admin/deleteData",(req,res)=>{

        console.log("deleted user");
        res.send("deleted user-using middleware-with seperate folder");

});


//another way of writting userauth

const{userAuth}=require("./middleware/auth");
//app.use("/user",adminAuth);

app.get("/user",userAuth,(req,res)=>{
    console.log("all data sent to user");
        res.send("all data sent-using middleware-with seperate folder-for user");
});


//mutiple route handling
/* app.use("/user",
    (req,res,next)=>{
        console.log("handling the route user!!");  //middleware
        next();
    },
    (req,res,next)=>{
        console.log("handling the route user1!!");//middleware
        next();
    },


    (req,res,next)=>{
        console.log("handling the route user2!!");//middleware
        next();
    },

    (req,res,next)=>{
        console.log("handling the route user4!!");//route handler
        res.send("user3 response");
    }

); */

/* app.get("/",

(req,res,next)=>{
    console.log("we are handling first middleware");
    next();
},
(req,res,next)=>{
    console.log("handling seconding middleware");
    next();
},
//(req,res,next)=>{
    //console.log("handling request handler");
    //res.send("handling route handler after it go through 2 middleware in between");
    //next();
//},
(req,res)=>{
    console.log("handling request handler");
    res.send("handling route handler after it go through 2 middleware in between");
},
(req,res,next)=>{
    console.log("handling request handler");
    res.send("handling route handler after it go through 2 middleware in between");  // this middleware doesnot run as it does not have request handler res.send()
    next();
}

); */

    
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