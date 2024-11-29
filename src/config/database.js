const mongoose =require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://roopabm36:PgNNscmf28tsPKfK@nodecluster.dxecy.mongodb.net/")};
    connectDB().then(()=>{
        console.log("database conencted");
    })
    .catch((err)=>{
        console.log("database conn't be connected!");
    });