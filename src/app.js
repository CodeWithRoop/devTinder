const express = require("express");
const connectDB=require("./config/database");
const User =require("./models/user");
const app=express();
app.use(express.json()); // Its middleware , It Converts JSON to javscript object
app.post("/signup",async(req,res)=>{
    //console.log(req.body);
    const user = new User(req.body);

    try{ await user.save();
        res.send("user added successfully!");}catch{
            res.status(400).send("something went wrong.",err.message);
        }
   
});

app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    //console.log(userEmail);
    try{
        if(userEmail===0){
            res.status(404).send("user not found");
        }
        else{
            const users=await User.find({emailId:userEmail}); 
            res.send(users);
        }
    }catch(err){
        res.status(404).send("something went wrong");
    }
})

//GET- /feed FETCH ALL USER FROM DATABASE
app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(404).send("something went wrong");
    }
})

//Delete record using findByIdDelete

app.delete("/user",async(req,res)=>{
const userId = req.body.userId;
console.log(userId);
try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user is deleted successfully!");
}
catch(err){
    res.status(404).send("something went wrong");
}
})




connectDB().then(()=>{
    console.log("database conencted");
    app.listen(3002,()=>{
        console.log("server is successfully listening on port 3002...");
    });
})
.catch((err)=>{
    console.log("database conn't be connected!");
});


//wildcard error handling

/* app.get("/getAllData",(req,res)=>{
    throw new Error("vdhfgd");
    console.log("sent all data");
    res.send("sent all data");
});

//always write error handler at the end of code,as javascript runs line by line
//sequence of param in route handler is very important
//always err,req,res,next  
//cant write like next,req,res,err
//order matters in routing,error handling
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
}) */


/* const{adminAuth}=require("./middleware/auth");
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
}); */


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



