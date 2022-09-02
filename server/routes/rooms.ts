import * as express from "express"
import { Request, Response } from 'express';
import { createRoom, deleteRoom, getroom, getroombyid, updateRoom, updateRoomAvailability } from "../controllers/room";


import { verifyAdmin } from "../utils/verifyToken";
// ROUTING FOR ROOMS
const router =express.Router();
// create
 router.post("/:hotelid",verifyAdmin ,createRoom ) 
   

  
 

//  update
 router.put("/:id"  ,verifyAdmin ,updateRoom)
//  Updating Availability room , unavailableid
 router.put("/availability/:id"  ,updateRoomAvailability)


//  Delete 
router.delete("/:id" ,verifyAdmin , deleteRoom)
// get by id
router.get("/:id" ,getroombyid)

// get all  
router.get("/" ,getroom);
 




 export default router