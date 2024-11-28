const express = require("express");
const app=express();


//without using middleware-used authorization code multiple times
//we can avoid using middleware

app.use("/admin",(req,res,next)=>{
    const token ="xyz";
    const isAdminAuthorised=token==="xyz";
    if(!isAdminAuthorised)
    {
        console.log("unathorized req");
        res.status(401).send("unathorized req-alldata");
    }
    else{
        next();
    }
})
app.get("/admin/getAllData",(req,res)=>{
    console.log("all data sent");
        res.send("all data sent-using middleware");
});

app.get("/admin/deleteData",(req,res)=>{

        console.log("deleted user");
        res.send("deleted user-using middleware");

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