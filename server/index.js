const connecttodb=require('./db');
var cors=require('cors')
const express=require('express');
connecttodb();
const path=require('path')
require('dotenv').config()
const app=express();
app.use(cors());
app.use(express.json());
const port =process.env.Port;
// serving the frontEnd
app.use(express.static(path.join(__dirname , "./client/build")))
// console.log(__dirname)
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/profile',require('./Routes/profile'));

app.get("*"  ,(req,res)=> {
    res.sendFile(
        path.join(__dirname , "./client/build/index.html"),

        function(err){
            res.status(500).send(err)
        }
    ) 
})
app.get('/',(req,res)=>{  
    res.send("Hello express world");
})
app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})