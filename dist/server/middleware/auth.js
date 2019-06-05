"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http2_1 = require("http2");
const path_1 = require("path");
const CLIENT_ROOT = path_1.resolve(process.cwd(), "dist/server/client");
const auth = express_1.Router();
const hashPass = (pass) => {
    const hash = crypto_1.default.createHash("sha256");
    hash.update(pass);
    return hash.digest("hex");
};
const checkLogin = (username, passwd) => {
    return username.toLowerCase() == process.env.DB_USER.toLowerCase() && hashPass(process.env.DB_USER) == hashPass(passwd);
};
auth.get("/login", (req, res) => {
    const token = req.cookies["Token"];
    const secret = process.env.SECRET;
    const verifyopts = { algorithm: "RS512" };
    if (!token) {
        res.sendFile(path_1.resolve(CLIENT_ROOT, "views/login.html"));
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, secret, verifyopts);
        if (verified) {
            res.redirect("/manage");
        }
        else {
            res.clearCookie("Token");
            res.sendFile(path_1.resolve(CLIENT_ROOT, "views/login.html"));
        }
    }
    catch (e) {
        res.clearCookie("Token");
        res.sendFile(path_1.resolve(CLIENT_ROOT, "views/login.html"));
    }
});
auth.post("/login", (req, res) => {
    const username = req.body["mbb-username"];
    const passwd = req.body["mbb-passwd"];
    const secret = process.env.SECRET;
    const verifyopts = { algorithm: "RS512" };
    if (username == undefined || passwd == undefined) {
        res.status(http2_1.constants.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({ status: "UNAUTHORIZED" }));
        return;
    }
    if (checkLogin(username, passwd)) {
        const token = jsonwebtoken_1.default.sign({
            username: username,
            timestamp: new Date().valueOf(),
        }, secret, { expiresIn: "1h" }, verifyopts);
        res.setHeader("Set-Cookie", "Token=" + token + "; Path=/;");
        res.redirect("/manage");
    }
    else {
        res.redirect("/login");
    }
});
auth.get("/*", (req, res, next) => {
    const token = req.cookies["Token"];
    const auth = req.headers["authorization"];
    const key = process.env.KEY;
    if (req.url == "/images/default-bg.png") {
        res.sendFile(path_1.resolve(CLIENT_ROOT, "images/default-bg.png"));
        return;
    }
    if (auth) {
        if (auth == key) {
            next();
            return;
        }
    }
    const secret = process.env.SECRET;
    const verifyopts = { algorithm: "RS512" };
    if (!token) {
        res.redirect("/login");
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, secret, verifyopts);
        if (verified) {
            next();
        }
        else {
            res.redirect("/login");
        }
    }
    catch (e) {
        res.redirect("/login");
    }
});
exports.default = auth;
