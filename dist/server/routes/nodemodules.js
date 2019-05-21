"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const nodemodules = express_1.Router();
nodemodules.get("/", (req, res) => {
    const pth = path_1.join(process.cwd(), req.baseUrl);
    if (fs_1.existsSync(pth)) {
        res.sendFile(pth);
    }
    else {
        res.status(404).send("404 NOT FOUND");
    }
});
exports.default = nodemodules;
