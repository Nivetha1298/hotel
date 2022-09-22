"use strict";
exports.__esModule = true;
var express = require("express");
var auth_1 = require("../controllers/auth");
var _a = require('express-validator'), check = _a.check, validationResult = _a.validationResult;
// ROUTING FOR LOGIN AND REGISTER
var router = express.Router();
router.post("/register", auth_1.register, [
    check('email', 'Email length should be 10 to 30 characters')
        .isEmail().isLength({ min: 10, max: 30 }),
    check('name', 'Name length should be 10 to 20 characters')
        .isLength({ min: 10, max: 20 }),
    check('mobile', 'Mobile number should contains 10 digits')
        .isLength({ min: 10, max: 10 }),
    check('password', 'Password length should be 8 to 10 characters')
        .isLength({ min: 8, max: 10 })
]);
router.get("/verify-email", auth_1.emailVerified);
router.post("/vpm", auth_1.verifyPasswordMail);
router.post("/changepassword", auth_1.changePassword);
router.post("/login", auth_1.login);
router.post("/googleLogin", auth_1.GoogleSignIn);
exports["default"] = router;
//# sourceMappingURL=auth.js.map