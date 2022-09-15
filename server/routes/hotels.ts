import * as express from "express"

import { createHotel, deleteHotel, gethotel, gethotelbyid, getHotelRooms, getRating, setRating, updateHotel } from "../controllers/hotel";

import { verifyAdmin } from "../utils/verifyToken";
// ROUTING FOR HOTELS
const router =express.Router();
// create,
 router.post("/" ,verifyAdmin ,createHotel ) 
   

  
 

//  update
 router.put("/:id",verifyAdmin ,updateHotel)

//  Delete 
router.delete("/:id",verifyAdmin , deleteHotel)
// get by id
router.get("/:id" ,gethotelbyid)

// get all  
router.get("/" ,gethotel);
// room/hotelid
router.get("/room/:id" ,getHotelRooms )  
// rating
router.post("/rating/:id" , setRating   ) 
router.get("/rating/:id"  , getRating) 




 export default router