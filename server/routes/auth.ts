import * as express from "express"
import { Request, Response } from 'express';
import { emailVerified, GoogleSignIn, login, register } from "../controllers/auth";
// ROUTING FOR LOGIN AND REGISTER
const router =express.Router();

 router.post("/register"  ,register )
 router.get("/verify-email"  ,emailVerified )

 router.post("/login"  ,login )
 router.post("/googleLogin"  ,GoogleSignIn )


 export default router