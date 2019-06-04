import express from "express";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./router";
import { resolve } from "path";

if (dotenv.config({path: resolve(process.cwd(), "config/config.cfg")}).error)
	throw "Invalid config file";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server: express.Application = express();
server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit:"5mb"}));
server.use("/", router);

server.listen(PORT, () => console.log(`Server started on port ${PORT} with pid ${process.pid}`));
