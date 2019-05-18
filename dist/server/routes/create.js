"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = require("path");
var http2_1 = require("http2");
var shortid = require("shortid");
var fs_1 = require("fs");
var TEMPLATES_DIR = path_1.resolve(process.cwd(), "templates");
var CLIENT_ROOT = path_1.resolve(process.cwd(), "dist/server/client");
var create = express_1.Router();
create.get("/", function (req, res, next) {
    if (req.path == "/")
        res.sendFile(path_1.resolve(CLIENT_ROOT, "views/create.html"));
    else
        next();
});
create.post("/", function (req, res) {
    var content = req.body.content;
    var id = shortid.generate();
    var pth = path_1.join(TEMPLATES_DIR, id + ".html");
    fs_1.writeFile(pth, content, function (err) {
        if (err)
            console.log(err);
    });
    res.status(http2_1.constants.HTTP_STATUS_CREATED).send(JSON.stringify({ body: req.body }));
});
exports.default = create;
