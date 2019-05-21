"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manage = express_1.Router();
manage.get("/", (req, res) => {
    res.send("MANAGE");
});
exports.default = manage;
