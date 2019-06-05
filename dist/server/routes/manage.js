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
const initDatabase_1 = require("../../main/database/initDatabase");
const pollActions_1 = require("../../main/database/actions/pollActions");
const voteActions_1 = require("../../main/database/actions/voteActions");
const path_1 = require("path");
const http2_1 = require("http2");
const fs_1 = require("fs");
const CLIENT_ROOT = path_1.resolve(process.cwd(), "dist/server/client");
const TEMPLATES_DIR = path_1.resolve(process.cwd(), "templates");
const manage = express_1.Router();
manage.get("/", (req, res, next) => {
    if (req.path == "/") {
        res.sendFile(path_1.resolve(CLIENT_ROOT, "views/manage.html"));
    }
    else {
        next();
    }
});
manage.get("/polls", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const db = yield initDatabase_1.initDatabase();
    const r = yield pollActions_1.getPolls(db);
    if (r) {
        res.json(r);
    }
    else {
        res.json({});
    }
}));
manage.get("/polls/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield initDatabase_1.initDatabase();
    const r = yield pollActions_1.getPoll(db, id);
    if (r) {
        res.json(r);
    }
    else {
        res.json({});
    }
}));
manage.get("/polls/:id/votes", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield initDatabase_1.initDatabase();
    const r = yield voteActions_1.getVotes(db, id);
    if (r) {
        res.json(r);
    }
    else {
        res.json({});
    }
}));
manage.get("/polls/:id/votes/:voteid", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const pollid = req.params.id;
    const voteid = req.params.voteid;
    const db = yield initDatabase_1.initDatabase();
    const votes = yield voteActions_1.getVoteCount(db, pollid, voteid);
    if (votes) {
        res.json({ pollid, voteid, votes });
    }
    else {
        res.json({});
    }
}));
manage.delete("/polls/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield initDatabase_1.initDatabase();
    const r = yield pollActions_1.removePoll(db, id);
    const templates = fs_1.readdirSync(TEMPLATES_DIR);
    templates.forEach((tmp) => __awaiter(this, void 0, void 0, function* () {
        if (tmp.startsWith(id) && tmp.endsWith(".html")) {
            fs_1.unlinkSync(path_1.resolve(TEMPLATES_DIR, tmp));
        }
    }));
    if (r) {
        res.status(http2_1.constants.HTTP_STATUS_OK).json(r);
    }
    else {
        res.status(http2_1.constants.HTTP_STATUS_NOT_FOUND).json({});
    }
}));
manage.delete("/polls/:id/votes", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield initDatabase_1.initDatabase();
    const r = yield voteActions_1.resetVotes(db, id);
    if (r) {
        res.json(r);
    }
    else {
        res.json({});
    }
}));
exports.default = manage;
