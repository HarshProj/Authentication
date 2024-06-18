require('dotenv').config()
const mongoose = require('mongoose');
const mongouri=process.env.Mongo_URI;
const connecttodb=async()=>{
    mongoose.connect(mongouri,{ autoIndex: false })
    mongoose.connection
    .once("open",()=> console.log("Connected"))
}
module.exports=connecttodb;