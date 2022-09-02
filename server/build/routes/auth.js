"use strict";
exports.__esModule = true;
var express = require("express");
var auth_1 = require("../controllers/auth");
// ROUTING FOR LOGIN AND REGISTER
var router = express.Router();
router.post("/register", auth_1.register);
router.post("/login", auth_1.login);
exports["default"] = router;
//# sourceMappingURL=auth.js.map