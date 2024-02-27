const express=require('express')
const {validationResult}=require('express-validator')
const router = express.Router();
const User=require('../Models/User');
const jwt=require('jsonwebtoken');
const JWT_SECRET="Userauth";
const otpGenerator=require('otp-generator');
const verifyuser=require('../Middleware/verifyuser')
const registermail=require('../Controllers/Mailer')
const fetchuser=require('../Middleware/fetchuser')
const localvariable=require('../Middleware/localvariable')
router.post('/register',async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        let user=await User.findOne({email:req.body.email})
        const user2=await User.findOne({name:req.body.name});
        if(user2){
            return res.status(404).json({error:"User with this name is already exists"});
        }
        if(user){
            return res.status(404).json({errors:"Sorry this email is already register "})
        }

        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            profile: ' '||req.body.profile
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({authtoken});
    } catch (error) {
        console.log(error.message);
        console.log("Internal server error");
    }

})
router.post('/login',async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const user=await User.findOne({name:req.body.name});
        if(!user){
            return res.status(404).json({error:"User with this name is not found"});
        }
        const pwd=req.body.password;
        if(pwd!=user.password){
            return res.status(400).json({error:"Incorrect password"})
        }
        const data={
            user:{
                id:user.id,
                name:user.name
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        return res.status(200).send({
            msg:"Login Sucessfully",
            name:user.name,
            authtoken
        });
    } catch (error) {
        console.log(error.message);
        console.log("Internal server error");
    }
})
router.get("/getuser/:name",async(req,res)=>{
    const {name}=req.params;
    try {
        if(!name){
            return res.status(501).send({error:"Invalid user name"})
        }
        const info=await User.findOne({name}).select("-password");
        res.status(200).send({info});
        
    } catch (error) {
        res.send(error);
    }
})

router.put("/updateuser",fetchuser,async(req,res)=>{
    try {
        const {id}=req.user;
        // console.log(id);
        if(!id){
            return res.status(500).json("Invalid user")
        }
        const body=req.body;
        const d=await User.updateOne({_id:id},body);
        if(!d){
            return res.status(400).send(d);
        }
        return res.status(200).send({msg:"Updated Sucsessfully...",data:body});
    } catch (error){
        return res.status(500).send({error:error});
    }
})
router.get("/generateotp",verifyuser,localvariable,async(req,res)=>{
    req.app.locals.OTP=await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    res.status(200).send({code:req.app.locals.OTP});
})
router.get("/verifyotp",verifyuser,localvariable,async(req,res)=>{
    const {code}=req.query;
    console.log(req.app.locals.OTP)
    if(parseInt(req.app.locals.OTP)===parseInt(code)){
        req.app.locals.OTP=null;
        req.app.locals.resetsession=true;
        return res.status(201).send({msg:"Verified Sucessfully"})
    }
    return res.status(400).send({error:"Invalid OTP..."})
})
router.get("/createresetsession",localvariable,async(req,res)=>{
    if(req.app.locals.resetsession){
        req.app.locals.resetsession=false;
        return res.status(201).send({msg:"Acess granted"})
    }
    return res.status(400).send({error:"Session Expired..."})
})
router.put("/resetPassword",localvariable,async(req,res)=>{
    const {name,password}=req.body;
    if(!res.app.locals.resetsession){
        return res.status(400).send({error:"Session Expired..."});
    }
    try {
        const data=User.findOne({name});
        if(!data){
            res.status(400).send("User name not found");
        }
        const d=await User.updateOne({name:name},{password:password});
        if(!d){
            return res.status(400).send(d);
        }
        req.app.locals.resetsession=false;
        return res.status(200).send({msg:"Record Updated..."});

    } catch (error) {
        return res.status(401).send({error})
        
    }
})
router.post("/registermail",registermail)
module.exports=router;