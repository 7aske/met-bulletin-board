"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var nodemodules = express_1.Router();
nodemodules.get("/", function (req, res) {
    var pth = path_1.join(process.cwd(), req.baseUrl);
    if (fs_1.existsSync(pth)) {
        res.sendFile(pth);
    }
    else {
        res.status(404).send("404 NOT FOUND");
    }
});
exports.default = nodemodules;
