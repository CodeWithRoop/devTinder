const mongoose =require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://roopabm36:PgNNscmf28tsPKfK@nodecluster.dxecy.mongodb.net/")};

    module.exports=connectDB;
 