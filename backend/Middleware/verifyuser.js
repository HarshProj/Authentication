const User=require("../Models/User")
const verifyuser=async(req,res,next)=>{
    try {
        const {name}=req.method=='GET'?req.query:req.body;
        let exist=await User.findOne({name:name});
        if(!exist){
            return res.status(404).send({error:"User not found..."});
        }
        next();
    } catch (error) {
        
    }
}
module.exports=verifyuser;