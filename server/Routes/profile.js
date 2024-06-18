const express=require('express');
const validatior=require('express-validator');
const Profile=require('../Models/Profile')
const router=express.Router();

router.post("./profile",(req,res)=>{
    const error=validatior(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    try {
        const profile=Profile.findOne({email:req.body.email});

        if(profile){
            return res.status(400).json("A user with this email already exists");
        }
        
    } catch (error) {
        
    }

})

module.exports=router;