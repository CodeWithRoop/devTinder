const mongoose=require("mongoose");
const validator=require("validator");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
/*     age:{
        type:Number,
        required:true,
        min:18,
    }, */
    emailId:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid format"+value);
            }
        }
    },
    passWord:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not valid"+value);
            }
        }
    },
/*     gender:{
        type:String,
        required:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("data not updated")
            }
        }
    }, */
    about:{
        type:String,
        default:"this is the default data when about field is empty"
    },
    skills:{
        type:[String],

    },
    photoUrl:{
        type:String,
        default:"https://geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("photo url is not valid" +value);
            }
        }
    }

},
{timestamps:true,});
module.exports=mongoose.model("User",userSchema);