import { Router } from "express";
import { constants as STATUS } from "http2";
import { getMIMEType } from "../utils/mime";
import { join } from "path";
import { existsSync } from "fs";

const CLIENT_ROOT = "bulletboard-frontend";
const INDEX = "index.html";

const index = Router();


index.get("/", async (req, res) => {
	let fpath = req.baseUrl;
	if (fpath === "") {
		fpath = join(CLIENT_ROOT, INDEX);
	} else {
		fpath = join(CLIENT_ROOT, fpath);
	}
	console.log("FPATH", fpath, req.baseUrl);
	if (existsSync(fpath)) {
		res.setHeader("Content-Type", getMIMEType(fpath));
		res.status(STATUS.HTTP_STATUS_OK).sendFile(fpath, {root: process.cwd()});
	} else {
		res.status(STATUS.HTTP_STATUS_NOT_FOUND).end();
	}
});

export default index;
