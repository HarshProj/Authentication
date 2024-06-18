const nodemailer = require("nodemailer");
const Mailgen = require('mailgen')
require('dotenv').config()
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.Email,
        pass: process.env.Password
    }
});
 let mailgenerator=new Mailgen({
     theme:"default",
     product:{
         name:"Mailgen",
         link:"https://mailgen.com"
     }
 })
const registermail=async(req,res)=>{
    const {username,useremail,text,subject}=req.body;

    var email1={
        body:{
            name:username,
            intro:text||"Welcome to haider private unlimited",
            outro:'Need help or to know somthing about the company mail on this email',
        }
    }
    var emailbody=await mailgenerator.generate(email1);
    let message ={
        from: process.env.Email, // sender address
        to: useremail, // list of receivers
        subject: subject||"Hello ✔", // Subject line
        text: text ||"Hello world?", // plain text body
        html: emailbody, // html body
      }

    transporter.sendMail(message).then(()=>{
        return res.status(200).send({msg:"You Should recieve aq mail from us"});
    })
    .catch((error)=>{res.status(500).send({error});console.log(error.response)})
}
module.exports=registermail;