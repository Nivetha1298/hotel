"use strict";
exports.__esModule = true;
var express = require("express");
var hotel_1 = require("../controllers/hotel");
var verifyToken_1 = require("../utils/verifyToken");
// ROUTING FOR HOTELS
var router = express.Router();
// create,
router.post("/", verifyToken_1.verifyAdmin, hotel_1.createHotel);
//  update
router.put("/:id", verifyToken_1.verifyAdmin, hotel_1.updateHotel);
//  Delete 
router["delete"]("/:id", verifyToken_1.verifyAdmin, hotel_1.deleteHotel);
// get by id
router.get("/:id", hotel_1.gethotelbyid);
// get all  
router.get("/", hotel_1.gethotel);
// room/hotelid
router.get("/room/:id", hotel_1.getHotelRooms);
// rating
router.post("/rating/:id", hotel_1.setRating);
router.get("/rating/:id", hotel_1.getRating);
exports["default"] = router;
//# sourceMappingURL=hotels.js.map