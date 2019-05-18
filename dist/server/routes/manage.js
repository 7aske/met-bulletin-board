"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var manage = express_1.Router();
manage.get("/", function (req, res) {
    res.send("MANAGE");
});
exports.default = manage;
