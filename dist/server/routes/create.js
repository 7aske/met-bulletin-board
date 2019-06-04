"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = require("path");
const http2_1 = require("http2");
const fs_1 = require("fs");
const initDatabase_1 = require("../../main/database/initDatabase");
const pollActions_1 = require("../../main/database/actions/pollActions");
const Poll_1 = require("../../main/database/schema/Poll");
const TEMPLATES_DIR = path_1.resolve(process.cwd(), "templates");
const CLIENT_ROOT = path_1.resolve(process.cwd(), "dist/server/client");
const create = express_1.Router();
create.get("/", (req, res, next) => {
    if (req.path == "/") {
        res.sendFile(path_1.resolve(CLIENT_ROOT, "views/create.html"));
    }
    else {
        next();
    }
});
create.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { content, choices } = req.body;
    const newPoll = new Poll_1.Poll(choices);
    const db = yield initDatabase_1.initDatabase();
    yield pollActions_1.addPoll(db, newPoll);
    const pth = path_1.join(TEMPLATES_DIR, newPoll.id + ".html");
    fs_1.writeFile(pth, content, err => {
        if (err) {
            console.log(err);
        }
    });
    res.status(http2_1.constants.HTTP_STATUS_CREATED).send(JSON.stringify({ poll: newPoll.json() }));
}));
exports.default = create;
