const express = require("express");
const app=express();


//without using middleware-used authorization code multiple times
//we can avoid using middleware

const adminAuth= (req,res,next)=>{
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
};

module.exports={adminAuth};