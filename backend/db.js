const mongoose = require('mongoose');
// const mongouri='mongodb://127.0.0.1:27017/Test';

const mongouri='mongodb+srv://hharshchauhan1:jyDIfqY3gqEKDAjU@authentication.j1qmwoh.mongodb.net/?retryWrites=true&w=majority&appName=authentication';
// {
//     useNewUrlParsed:true,mongodb://localhost:27017
//     useUnifiedTopology:true
// // }
const connecttodb=async()=>{
    mongoose.connect(mongouri,{ autoIndex: false })
    mongoose.connection
    .once("open",()=> console.log("Connected"))
}
module.exports=connecttodb;