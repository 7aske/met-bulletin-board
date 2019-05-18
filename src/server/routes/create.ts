import { Router } from "express";
import { join, resolve } from "path";
import { constants as STATUS } from "http2";
import shortid = require("shortid");
import { writeFile, writeFileSync } from "fs";


const TEMPLATES_DIR = resolve(process.cwd(), "templates");
const CLIENT_ROOT: string = resolve(process.cwd(), "dist/server/client");

const create = Router();

create.get("/", (req, res, next) => {
	if (req.path == "/")
		res.sendFile(resolve(CLIENT_ROOT, "views/create.html"));
	else
		next();
});
create.post("/", (req, res) => {
	const {content} = req.body;
	const id = shortid.generate();
	const pth = join(TEMPLATES_DIR, id + ".html");
	writeFile(pth, content, err => {
		if (err)
			console.log(err);
	});
	res.status(STATUS.HTTP_STATUS_CREATED).send(JSON.stringify({body: req.body}));
});

export default create;
