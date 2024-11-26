const express = require("express");
const app=express();

app.use("/hi",(req,res)=>{res.send("hello from the server!hi roopa")});

app.use("/test",(req,res)=>{res.send("hello from the server test!")});

app.use("/hello",(req,res)=>{res.send("hello from the server hello!")});
app.listen(3002,()=>{
    console.log("server is successfully listening on port 3002...");
});