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
const authentication = express_1.Router();
const hashPass = (pass) => {
    const hash = crypto_1.default.createHash("sha256");
    hash.update(pass);
    return hash.digest("hex");
};
const checkLogin = (username, passwd) => {
    return username.toLowerCase() == process.env.MBBUSER.toLowerCase() && hashPass(process.env.MBBPASS) == hashPass(passwd);
};
authentication.post("/login", (req, res) => {
    const username = req.body["mbb_username"];
    const passwd = req.body["mbb_password"];
    const secret = process.env.SECRET;
    const verifyopts = { algorithm: "RS512" };
    console.log("login", req.body);
    if (username == undefined || passwd == undefined) {
        res.status(http2_1.constants.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({ status: "UNAUTHORIZED" }));
        return;
    }
    if (checkLogin(username, passwd)) {
        const token = jsonwebtoken_1.default.sign({
            username: username,
            timestamp: new Date().valueOf(),
        }, secret, { expiresIn: "1h" }, verifyopts);
        // res.setHeader("Set-Cookie", "Token=" + token + "; Path=/;");
        res.status(http2_1.constants.HTTP_STATUS_OK).json({ status: "OK", message: "Logged in", token: token });
    }
    else {
        res.status(http2_1.constants.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({
            status: "UNAUTHORIZED",
            message: "Invalid credentials",
            token: null,
        }));
    }
});
authentication.post("/validate", (req, res) => {
    const token = req.body["token"];
    console.log("validate", req.body);
    const secret = process.env.SECRET;
    const verifyopts = { algorithm: "RS512" };
    try {
        const verified = jsonwebtoken_1.default.verify(token, secret, verifyopts);
        if (verified) {
            res.status(http2_1.constants.HTTP_STATUS_OK).json({ status: "OK", message: "Valid token" });
        }
        else {
            res.status(http2_1.constants.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({
                status: "UNAUTHORIZED",
                message: "Invalid token",
            }));
        }
    }
    catch (e) {
        res.status(http2_1.constants.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({
            status: "UNAUTHORIZED",
            message: "Invalid token",
        }));
    }
});
exports.default = authentication;
