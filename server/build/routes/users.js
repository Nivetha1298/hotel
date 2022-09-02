"use strict";
exports.__esModule = true;
var express = require("express");
var user_1 = require("../controllers/user");
var verifyToken_1 = require("../utils/verifyToken");
var router = express.Router();
// ROUTING FOR USERS
//  update
router.put("/:id", user_1.updateUser);
//  Delete 
router["delete"]("/:id", user_1.deleteUser);
// get by id
router.get("/:id", user_1.getUserbyid);
// get all  
router.get("/", verifyToken_1.verifyAdmin, user_1.getUsers);
exports["default"] = router;
//# sourceMappingURL=users.js.map