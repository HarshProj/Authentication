const nodemailer = require("nodemailer");
const Mailgen = require('mailgen')
const Email="florida.orn30@ethereal.email"
const Password="KsCzn2pPd6QZBhgrbU"

const registermail=async(req,res)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'alicia.mueller@ethereal.email',
            pass: 'ENs2XbUY8QGENw9uhs'
        }
    });
     let mailgenerator=new Mailgen({
         theme:"default",
         product:{
             name:"Mailgen",
             link:"https://mailgen.com"
         }
     })
    const {username,useremail,text,subject}=req.body;

    var email1={
        body:{
            name:username,
            intro:text||"Welcome to haider private unlimeted",
            outro:'Need help or to know somthing about the company mail on this email',
        }
    }
    var emailbody=await mailgenerator.generate(email1);
    let message ={
        from: 'alicia.mueller@ethereal.email', // sender address
        to: useremail, // list of receivers
        subject: subject||"Hello ✔", // Subject line
        text: text ||"Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }

    const info =await transporter.sendMail(message).then(()=>{
        return res.status(200).send({msg:"You Should recieve aq mail from us"});
    })
    .catch((error)=>{res.status(500).send({error});console.log(error.response)})
}
module.exports=registermail;