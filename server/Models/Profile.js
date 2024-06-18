const mongoose =require('mongoose');
const {Schema}=mongoose;

const ProfileSchema=new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
})

const Profile=mongoose.model('profile',ProfileSchema);
module.exports=Profile;