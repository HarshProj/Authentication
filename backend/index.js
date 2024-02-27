const connecttodb=require('./db');
var cors=require('cors')
const express=require('express');
connecttodb();
const app=express();
app.use(cors());
app.use(express.json());

const port =5000;

app.use('/api/auth',require('./Routes/auth'));
app.use('/api/profile',require('./Routes/profile'));

app.get('/',(req,res)=>{  
    res.send("Hello express world");
})
app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})