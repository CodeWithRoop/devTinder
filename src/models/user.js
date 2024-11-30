const mongoose=require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    age:{
        type:Number,
        required:true,
        min:18,

    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    passWord:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("data not updated"+err.message)
            }
        }
    },
    about:{
        type:String,
        default:"this is the default data when about field is empty"
    },
    skill:{
        type:[String],

    },

},
{timestamps:true,});
module.exports=mongoose.model("User",userSchema);