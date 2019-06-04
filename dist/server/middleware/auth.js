"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http2_1 = require("http2");
const auth = express_1.Router();
const hashPass = (pass) => {
    const hash = crypto_1.default.createHash("sha256");
    hash.update(pass);
    return hash.digest("hex");
};
const checkLogin = (username, passwd) => {
    return username == process.env.DB_USER && hashPass(process.env.DB_USER) == hashPass(passwd);
};
auth.get("/login", (req, res) => {
    const token = req.cookies["Token"];
    const secret = process.env.SECRET;
    const verifyopts = { algorithm: "RS512" };
    if (!token) {
        res.send(loginPage);
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, secret, verifyopts);
        if (verified) {
            res.redirect("/manage");
        }
        else {
            res.clearCookie("Token");
            res.send(loginPage);
        }
    }
    catch (e) {
        res.clearCookie("Token");
        res.send(loginPage);
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
const loginPage = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "        <head>\n" +
    "                <meta charset=\"UTF-8\" />\n" +
    "                <meta\n" +
    "                        name=\"viewport\"\n" +
    "                        content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\"\n" +
    "                />\n" +
    "                <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />\n" +
    "                <title>Deployment Server</title>\n" +
    "                <style>\n" +
    "                        * {\n" +
    "                                font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif,\n" +
    "                                        \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n" +
    "                        }\n" +
    "                        body,\n" +
    "                        html {\n" +
    "                                width: 100%;\n" +
    "                                overflow-x: hidden;\n" +
    "                                background-color: #222222;\n" +
    "                                color: #ffffff;\n" +
    "                        }\n" +
    "                        input {\n" +
    "                                margin-left: -8px;\n" +
    "                                border-radius: 8px;\n" +
    "                                padding: 10px;\n" +
    "                                border: 2px solid #666666;\n" +
    "                                font-size: 24px;\n" +
    "                                margin-bottom: 10px;\n" +
    "                        }\n" +
    "                        button {\n" +
    "                                font-size: 24px;\n" +
    "                                border: 2px solid #666666;\n" +
    "                                border-radius: 8px;\n" +
    "                                padding: 10px 25px;\n" +
    "                                background-color: gold;\n" +
    "                        }\n" +
    "                </style>\n" +
    "        </head>\n" +
    "        <body style=\"text-align: center;\">\n" +
    "                <h1>Admin Login</h1>\n" +
    "                <form method=\"POST\" action=\"/login\">\n" +
    "                        <input type=\"text\" name=\"mbb-username\" placeholder=\"Username\" /><br />\n" +
    "                        <input type=\"password\" name=\"mbb-passwd\" placeholder=\"Password\" /><br />\n" +
    "                        <button type=\"submit\">Login</button>\n" +
    "                </form>\n" +
    "        </body>\n" +
    "</html>";
exports.default = auth;
