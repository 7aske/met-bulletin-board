import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./router";
import cors from "cors";
import morgan from "morgan";
import { log } from "./middleware/log";
import { testDbConn } from "./db/util";
import mongoose from "mongoose";


if (dotenv.config({path: "config/config.cfg"}).error)
	throw "Invalid config file";

// testDbConn().catch(e => {
// 	console.error(e);
// 	process.exit(1);
// });

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:27017`;
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}).then().catch(err => console.error(err));


process.env.SECRET = process.env.SECRET || "ACAKULTIVATQR9";
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server: express.Application = express();
server.use(cors());
server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: "10mb"}));
server.use(log);
server.use(morgan("dev"));
server.use("/", router);

server.listen(PORT, () => console.log(`Server started on port ${PORT} with pid ${process.pid}`));
