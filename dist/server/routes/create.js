"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = require("path");
const http2_1 = require("http2");
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
create.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {content, choices} = req.body;
    // const newPoll = new Poll(choices);
    // const db = await initDatabase();
    // await addPoll(db, newPoll);
    // const pth = join(TEMPLATES_DIR, newPoll.id + ".html");
    // writeFile(pth, content, err => {
    // 	if (err) {
    // 		console.log(err);
    // 	}
    // });
    // TODO: saving
    res.status(http2_1.constants.HTTP_STATUS_CREATED).send(JSON.stringify({ poll: {} }));
}));
exports.default = create;
