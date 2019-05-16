"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var manage_1 = require("./routes/manage");
var router = express_1.Router();
router.get("/manage", manage_1.manage);
exports.default = router;
