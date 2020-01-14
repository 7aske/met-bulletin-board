import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./router";
import cors from "cors";
import morgan from "morgan";
import { log } from "./middleware/log";
import mongoose from "mongoose";


if (dotenv.config({path: "config/config.cfg"}).error)
	throw "Invalid config file";
else {
	if (process.env.DB_USER === undefined){
		throw "DB_USER not defined in config file";
	}
	if (process.env.DB_PASS === undefined){
		throw "DB_PASS not defined in config file";
	}
	if (process.env.DB_NAME === undefined){
		throw "DB_NAME not defined in config file";
	}
	if (process.env.DB_IP === undefined){
		throw "DB_IP not defined in config file";
	}
}

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IP}:27017`;
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true, dbName: process.env.DB_NAME}).then().catch(err => {
	throw err;
});


process.env.SECRET = process.env.SECRET || "ACAKULTIVATQR9";
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server: express.Application = express();
server.disable("etag");
server.use(cors());
server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: "10mb"}));
server.use(log);
server.use(morgan("dev"));
server.use("/", router);

server.listen(PORT, () => console.log(`Server started on port ${PORT} with pid ${process.pid}`));
