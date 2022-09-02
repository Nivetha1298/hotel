import * as express from "express"
import { Request, Response } from 'express';
import { GoogleSignIn, login, register } from "../controllers/auth";
// ROUTING FOR LOGIN AND REGISTER
const router =express.Router();

 router.post("/register"  ,register )
 router.post("/login"  ,login )
 router.post("/googleLogin"  ,GoogleSignIn )


 export default router