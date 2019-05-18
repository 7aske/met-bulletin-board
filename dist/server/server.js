"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var router_1 = __importDefault(require("./router"));
var path_1 = require("path");
var result = dotenv_1.default.config({ path: path_1.resolve(process.cwd(), "config/config.cfg") });
if (result.error)
    throw result.error;
var server = express_1.default();
var PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
server.use("/", router_1.default);
server.listen(PORT, function () { return console.log("Server started on port " + PORT); });
