"use strict";
exports.__esModule = true;
var express = require("express");
var auth_1 = require("../controllers/auth");
// ROUTING FOR LOGIN AND REGISTER
var router = express.Router();
router.post("/register", auth_1.register);
router.get("/verify-email", auth_1.emailVerified);
router.post("/login", auth_1.login);
router.post("/googleLogin", auth_1.GoogleSignIn);
exports["default"] = router;
//# sourceMappingURL=auth.js.map