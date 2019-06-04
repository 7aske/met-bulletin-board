"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
const path_1 = require("path");
if (dotenv_1.default.config({ path: path_1.resolve(process.cwd(), "config/config.cfg") }).error)
    throw "Invalid config file";
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server = express_1.default();
server.use(cookie_parser_1.default());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(body_parser_1.default.json({ limit: "5mb" }));
server.use("/", router_1.default);
server.listen(PORT, () => console.log(`Server started on port ${PORT} with pid ${process.pid}`));
