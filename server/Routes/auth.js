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
const bcrypt=require('bcryptjs'); 
router.post('/register',async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
        }
        try {
            let user=await User.findOne({email:req.body.Email})
            const user2=await User.findOne({name:req.body.Username});
            if(user2){
                return res.status(404).json({error:"User with this name is already exists"});
                }
                if(user){
                    return res.status(404).json({errors:"Sorry this email is already register "})
                    }
                    
                    const salt=await bcrypt.genSalt(10);
                    const hash=await bcrypt.hash(req.body.Password,salt);
                    // console.log(hash);
                    // console.log(req.body); 
        user=await User.create({  
            name:req.body.Username,
            email:req.body.Email,
            password:hash,
            profile:req.body.property==' '?' ':req.body.property
        })
        // user.save()
        // .then(result=>res.status(200).send({msg:"User Registered Successfully"}))
        // .catch(error=>res.status(500).send({error}));
        const data={ 
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({msg:"User Registered Successfully",authtoken});
    } catch (error) {
        console.log(error.message);
        console.log("Internal server error");
        res.send({error});
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
        // const pwd=req.body.password;
        const cmp=await bcrypt.compare(req.body.password,user.password);
        // console.log(req.body.password,user.password,cmp);
        if(!cmp){
            return res.status(400).json({error:"Incorrect password"})
        }
        const data={
            user:{
                id:user.id,
                name:user.name
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        // console.log(cmp);
        return res.status(200).send({
            msg:"Login Sucessfully",
            name:user.name,
            authtoken
        });
    } catch (error) {
        // console.log(error.message);
        console.log("Internal server error");
        res.send({error});
    }
})
router.get("/getuser/:name",async(req,res)=>{
    const {name}=req.params;
    try {
        if(!name){
            return res.status(501).send({error:"Invalid user name"})
        }
        const data=await User.findOne({name}).select("-password");
        res.status(200).send({data});
        // console.log(data.name);
        
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
router.post("/authenticate",verifyuser,(req,res)=> res.end());
router.get("/generateotp",verifyuser,localvariable,async(req,res)=>{
    req.app.locals.OTP=await otpGenerator.generate(6,{
        lowerCaseAlphabets:false,
        upperCaseAlphabets:false,
        specialChars:false})
        // console.log(req.app.locals.OTP);
    return res.status(200).send({code:req.app.locals.OTP});
})
router.get("/verifyotp",verifyuser,localvariable,async(req,res)=>{
    const { code } = req.query;
    // console.log("Stored OTP:", req.app.locals.OTP); // Log the stored OTP
    // console.log("Received code:", code); // Log the received code
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        // console.log(req.app.locals.resetSession);
        return res.status(201).send({ msg: "Verified Successfully" });
    }
    // console.log(req.app.locals, code);
    return res.status(400).send({ error: "Invalid OTP..." });
})
router.get("/createresetsession",localvariable,async(req,res)=>{
    // console.log(req.app.locals.resetSession)
    if(req.app.locals.resetSession){
        return res.status(200).send({data:{flag:req.app.locals.resetSession}})
    }
    return res.status(400).send({error:"Session Expired..."})
})
router.put("/resetPassword",verifyuser,localvariable,async(req,res)=>{
    const {name,password}=req.body;
    // console.log("Session Expired",req.app.locals.resetSession,name,password) 
    if(!res.app.locals.resetSession){
            return res.status(400).send({error:"Session Expired..."});
        }
        try {
            const data=await User.findOne({name:name});
            if(!data){
                res.status(400).send("User name not found");
            }
            const salt=await bcrypt.genSalt(10);
            const hash=await bcrypt.hash(password,salt);
            const d=await User.updateOne({name:name},{password:hash})
                if(!d.acknowledged){
                    return res.status(400).send(err);
                }
                // console.log(d);
                
                req.app.locals.resetSession=false;
                return res.status(200).send({msg:"Record Updated..."});

    } catch (error) {
        return res.status(401).send({error})
        
    }
})
router.post("/registermail",registermail)
module.exports=router;