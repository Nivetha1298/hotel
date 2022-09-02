import { Request, Response } from "express";
const bcrypt = require('bcryptjs');
import User from "../models/User";
import { createError } from "../utils/error";
const jwt =require('jsonwebtoken')

// Authentication for Register

export const  register = async(req:Request ,res:Response,next)=>{
    try{
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
                city:req.body.city 

             })

             await newUser.save()
             res.status(200).send("User has been created")
           

    }  catch(err){
                             
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


