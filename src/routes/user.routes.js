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


// user.post("/forget" ,async(req,res)=>{
//     const {email} = req.body
//     const otp = Math.floor(Math.random()*1000000)
//     let check = await otpModel.findOne({email});
//     if(check){
//         await otpModel.deleteOne({email});
//     }
//     const otpCollection = new otpModel({otp,email})
//     await otpCollection.save()
//     // transport.sendMail({
//     //     to: email,
//     //     from:"bloghead@gmail.com",
//     //     subject:"OTP Sent Successfully ",
//     //     text:`Hello ${email}, Your OTP is ${otp}`
    
//     // }).then((e)=>{
//     //     console.log("Otp sent Successfully")
//     //     res.send("Otp Sent Successfully")
//     // })
// })


// user.post("/reset" , async (req,res)=>{
//     const {email , newPass, otp} = req.body;
//     console.log(email)
//     let otps = await otpModel.findOne({email});
//     console.log(otps)
//     try{
//         let checkOtp = otps.otp;
//         if(checkOtp === otp){
//             const delOtp = await otpModel.deleteOne({email});
//             const user = await UserModel.findOneAndUpdate({email},{$set:{password:newPass}});
//             res.status(200).send("Your Password Is Updated")
//         }else{
//             return res.send("invalid OTP")
//         }
//     }catch(e){
//         return res.status(400).send("error")
//     }
// })


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