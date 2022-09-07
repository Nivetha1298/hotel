"use strict";
exports.__esModule = true;
var express = require("express");
var payment_1 = require("../controllers/payment");
var router = express.Router();
router.post("/", payment_1.payment);
exports["default"] = router;
//# sourceMappingURL=payment.js.map