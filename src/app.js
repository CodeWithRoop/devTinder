const express = require("express");
const connectDB=require("./config/database");
const User =require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const app=express();
app.use(express.json()); // Its middleware , It Converts JSON to javscript object
app.post("/signup",async(req,res)=>{
    try{ 
    validateSignUpData(req);
    //console.log(req.body);
    const {firstName,lastName,emailId,passWord} =req.body;
    const passWordHash =await bcrypt.hash(passWord,10);
    const user = new User({firstName,lastName,emailId,passWord:passWordHash});

await user.save();
        res.send("user added successfully!");}
        catch(err){
            res.status(400).send("something went wrong."+err.message);
        }
   
});

//Login credential authentication

app.post("/login",async (req,res)=>{
    try{
        const {emailId,passWord} =req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials!");
        }

        const isPassWordValid = await bcrypt.compare(passWord,user.passWord);
        if(isPassWordValid){
            res.send("login Successfull!");
        }
        else{
            throw new Error("Invalid Credentials!");
        }


    }catch(err){
        res.status(400).send("Error:"+err.message);
    }
})


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

//Delete record using findByIdAndDelete

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

//update user record using findByIdAndUpdate

app.patch("/user1",async(req,res)=>{
    const userId= req.body.userId;
    const data=req.body;

    try{
        await User.findByIdAndUpdate({_id:userId},data),{returnDocument:"after",runValidator:true};
        res.send("user updated successfully!");
    }
    catch(err){
        res.status(404).send("something went wrong");

    }  
   
}) 


//exploring update record=returnDocument:before

app.patch("/user/:userId",async(req,res)=>{
    const userId= req.params?.userId;
    const data=req.body;
    console.log(data);
    try{

        const ALLOWED_UPDATES =["skills","about","gender","age","photoUrl","passWord"];

        const isAllowedUpdates = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        console.log(isAllowedUpdates);
        if(!isAllowedUpdates)
        {
            //console.log("entered not allowed");
            throw new Error("updates not allowed");
           
        }
        else{
            const user= await User.findByIdAndUpdate({_id:userId},data);
            console.log(user);
            res.send("user updated successfully!");
        }
        if(data?.skills.length>10)
        {
            throw new Error("update not allowed");
        }
        
    }
    catch(err){
        res.status(404).send("update Failed : "+err.message);

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



