"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var router_1 = __importDefault(require("./router"));
var path_1 = require("path");
if (dotenv_1.default.config({ path: path_1.resolve(process.cwd(), "config/config.cfg") }).error)
    throw "Invalid config file";
var PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
var server = express_1.default();
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(body_parser_1.default.json({ limit: "5mb" }));
server.use("/", router_1.default);
server.listen(PORT, function () { return console.log("Server started on port " + PORT + " with pid " + process.pid); });
