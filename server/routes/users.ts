import * as express from "express"
import { Request, Response } from 'express';
import{ deleteUser, getUserbyid, getUsers, updateUser }from "../controllers/user"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken";

const router =express.Router();

// ROUTING FOR USERS
 //  update
 router.put("/:id" ,updateUser);

//  Delete 
router.delete("/:id" ,  deleteUser)
// get by id
router.get("/:id" , getUserbyid)

// get all  
router.get("/" ,verifyAdmin ,getUsers);
 


 export default router