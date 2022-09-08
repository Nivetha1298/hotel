import { Request, Response } from "express";
import { Otp } from "../models/Otp";
const bcrypt = require('bcryptjs');
import User from "../models/User";
import { userVerification } from "../models/userVerification";
const crypto = require('crypto');
import { createError } from "../utils/error";
const jwt =require('jsonwebtoken')
// email handler
const nodemailer=require("nodemailer");
//  unique string
const {v4:uuidv4} =require("uuid"); 



require("dotenv").config();




// node mailer 
let transporter = nodemailer.createTransport({
  service: "gmail" ,
  auth:{
    user:process.env.AUTH_EMAIL  ,
    pass:process.env.AUTH_PASS 
  }

  // TESTING 
 

})
transporter.verify((error ,success) =>{
  if(error){
    console.log(error);
  
  }
  else{
    console.log("Ready for Messages");
    console.log("Success")
    
  }
})
// Authentication for Register

export const  register = async(req:Request ,res:Response,next)=>{
    try{

      const existinguser= await User.findOne({email:req.body.email})
      if(existinguser){
        return res.status(400).json({message:"Existing user"   , isexist:true})
      }
                           //encrypting password
        const  salt = await bcrypt.genSaltSync(10);
        const  hash  =  await bcrypt.hashSync(req.body.password,salt)
             const  newUser = new User({
                username :req.body.username ,
                email :req.body.email ,
                password:hash ,
                isAdmin : req.body.isAdmin,
                img:req.body.img , 
                phone:req.body.phone ,
                city:req.body.city  ,
                 isVerified: false,

                emailToken: crypto.randomBytes(64).toString("hex"),

             })
             await newUser.save()  
             
             const mailOptions = {

              from: "nivethakumar1298@gmail.com",
        
              to: newUser.email,
        
              subject: "Verify your email address",
        
              html: `<p>Hello ${newUser.username}! A Message from Hotel booking!.Please Verify your email address to complete the signup process and login to your account</p>
        
                    <p>press here <a href="http://${req.headers.host}/api/auth/verify-email?token=${newUser.emailToken}"> here</a> to verify your mailId. </p>`,
        
            };
        
            transporter.sendMail(mailOptions, function (error, info) {
        
              if (error) {
        
                console.log(error);
        
              }
        
                console.log("Verification Mail sent");
        
                res.status(400).json({ message: "Verification Mail sent" });
        
            });
        
          } catch (error) {
        
                 
        
          }

        }

//Authentication for login
export const  login = async(req:Request ,res:Response,next)=>{
    try{


       const user:any = await User.findOne({username:req.body.username });
       if(!user)
       return next(createError(404 , "User not found"));
                       //decrypting the password
 const isPasswordCorrect=await bcrypt.compare(
    req.body.password     ,
    user.password
 );
       if(!isPasswordCorrect)
       return next(createError(400 , "Wrong password or username"));

       
          
      
    const token = jwt.sign({

        id: user._id,

        isAdmin:user.isAdmin,

      },process.env.JWT_KEY,{

        expiresIn:"2d"

      })
      console.log(token)
      const {password ,isAdmin , ...otherDetails}=user._doc;
       
      
       res.status(200).json({  token:token , details: {...otherDetails}  ,isAdmin});

    }  catch(err){
        next(err);

    }

}




export const GoogleSignIn = async (req, res) => {

    const { email, name, token, googleId ,imageUrl} = req.body;
  
    try {
  
      const existingUser = await User.findOne({ email });
  
    //   if (existingUser &&existingUser.isVerified) {
  
    //     res.status(400).json({ message: "Email Address already exists" });
  
         if (existingUser) {
  
         res.status(200).json({ result: existingUser, token });
  
       }
  
      if (!existingUser) {
  
        const result = await User.create({
  
          email,
  
          username:name,
  
          img:imageUrl,
          googleId,
  
        });
  
        res.status(200).json({ result, token });
  
      }
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };

  export const emailVerified = async (req, res) => {



    try {
  
      //getting token from mail verification
  
      const token = req.query.token;
  
      //Checking if there any emailToken with token
  
      const user = await User.findOne({ emailToken: token });
  
      if (user) {
  
      //assign value to database as verified
  
        user.emailToken = null;
  
        user.isVerified = true;
  
        await user.save();
  
        //redirect to login page after verify email
  
        res.redirect("http://localhost:3000/login");
  
      } else {
  
        console.log("Email is not verified");
  
      }
  
    } catch (error) {
  
      console.log(error);
  
    }
  
  };



  export const verifyPasswordMail = async (req, res) => {
    //Checking emailid from front-end
  const user:any = await User.findOne({ email: req.body.email });

  if (User) {
    //generate OTP 
    let otpCode:any = Math.floor(Math.random() * 10000 + 1);
    //save OTP to database with expire time
    let otpData:any = new Otp({
      email: req.body.email,
      code: otpCode,
      expiresIn: new Date().getTime() + 400 * 1000,
    });
    await otpData.save();
    //send OTP to mail
    const mailOptions:any = {
      from: "nivethakumar1298@gmail.com",
      to: user.email,
      subject: "verify your email",
      html: `<p>Hello ${User.name}. Your OTP is ${otpData.code}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        console.log("Verification Mail sent");
      }
    });
    res.status(200).json({message:"Success"})
  } else {
    return res.status(400).json({message:"EmailId not yet registered "});
  }
};

export const changePassword = async (req, res) => {
    //Checking whether is there any OTP with that mail address
  let data:any = await Otp.findOne({ email: req.body.email, code: req.body.code });

  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expiresIn - currentTime;
    //if time expires OTP will not be valid
    if (diff < 0) {
      return res.status(400).json("error");
    } else {
    //if valid new password will be save.
      const user:any = await User.findOne({ email: req.body.email });
      const hashedPassword = await bcrypt.hash(req.body.password, 13);
      user.password = hashedPassword;
      user.save();
      console.log("Success");
      res.status(200).json("Password Changed Successfully");
    }
  } else {
    return res.status(400).json({message:"InCorrect OTP"});
  }
};