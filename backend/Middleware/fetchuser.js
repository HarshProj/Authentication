const jwt=require('jsonwebtoken');
const JWT_SECRET="Userauth";
const fetchuser=(req,res,next)=>{
    console.log(req);
    const token=req.header('auth-token');
    // console.log(token)
    if(!token){
        return res.status(500).json("Invalid token")
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        // console.log(data);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(501).send(error);
    }
}
module.exports =fetchuser;