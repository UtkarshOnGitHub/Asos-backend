const {Router} = require("express")
const UserModel = require("../models/user.model")
// const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken");
// const otpModel = require("../modals/Opt.model");



const user = Router()




// const transport = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'nicholaus.roberts@ethereal.email',
//         pass: 'WZWjdNpjb216j5DQbw'
//     }
// });


user.post("/signup" , async (req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password);
    const check = await UserModel.findOne({email})
    if(check){
        res.status(409).send("Cannot Create two User With same Email ");
        return
    }
    try {
        const user = new UserModel({name,email,password});
        await user.save()
        res.send("User Created Successfully")
    } catch (error) {
        console.log(error)
    } 
})



user.post("/login" , async(req,res)=>{
    const {email , password} = req.body;
    console.log(email)
    const user = await UserModel.findOne({email , password})
    if(!user){
        return res.send("Invalid Credential")
    }
    const token = jwt.sign({id:user._id ,email:user.email,age:user.age}, "HASHIRA" , {
        expiresIn:"24 hours"
    })
    res.send({message:"Token Generated",token:token}).status(200)
})


user.post("/getuser" , async (req,res)=>{
    const {token} = req.body
    if(!token){
        res.status(401).send("Unauthorized")
    }
    try{
        const verification = jwt.verify(token , "HASHIRA")
        res.send(verification)
    }catch(e){
        res.status(401).send("Invalid Token")
    }
})





module.exports = user