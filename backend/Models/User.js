const mongoose =require('mongoose');

const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    mobile:{
        type:Number
    },
    address:{
        type:String
    },
    profile:{
        type:String
    },
})
const User=mongoose.model('user',UserSchema);
module.exports=User;