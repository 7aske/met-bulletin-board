import { Router } from "express";
import { join, resolve } from "path";
import { constants as STATUS } from "http2";
import { writeFile } from "fs";
import { initDatabase } from "../../main/database/initDatabase";
import { addPoll } from "../../main/database/actions/pollActions";
import { Poll } from "../../main/database/schema/Poll";


const TEMPLATES_DIR = resolve(process.cwd(), "templates");
const CLIENT_ROOT: string = resolve(process.cwd(), "dist/server/client");

const create = Router();

create.get("/", (req, res, next) => {
	if (req.path == "/") {
		res.sendFile(resolve(CLIENT_ROOT, "views/create.html"));
	} else {
		next();
	}
});
create.post("/", async (req, res) => {
	const {content, choices} = req.body;
	const newPoll = new Poll(choices);
	const db = await initDatabase();
	await addPoll(db, newPoll);
	const pth = join(TEMPLATES_DIR, newPoll.id + ".html");
	writeFile(pth, content, err => {
		if (err) {
			console.log(err);
		}
	});
	res.status(STATUS.HTTP_STATUS_CREATED).send(JSON.stringify({poll: newPoll.json()}));
});

export default create;
