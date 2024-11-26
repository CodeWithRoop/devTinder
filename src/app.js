const express = require("express");
const app=express();

app.use("/test",(req,res)=>{res.send("USE handler tested!order matters in routing")});

app.get("/test",(req,res)=>{res.send("get API tested")});
app.post("/test",(req,res)=>{res.send("post API tested!")});
app.delete("/test",(req,res)=>{res.send("delete API tested!")});


app.listen(3002,()=>{
    console.log("server is successfully listening on port 3002...");
});