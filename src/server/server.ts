import express from "express";
import dotenv from "dotenv";
import { resolve } from "path";
import router from "./router";

const result = dotenv.config({path: resolve(process.cwd(), "config/.env")});

if (result.error) {
	throw result.error;
}
const server: express.Application = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

server.use("/", router);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
