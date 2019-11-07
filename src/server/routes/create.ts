import { Router } from "express";
import { resolve } from "path";
import { constants as STATUS } from "http2";


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
	// const {content, choices} = req.body;
	// const newPoll = new Poll(choices);
	// const db = await initDatabase();
	// await addPoll(db, newPoll);
	// const pth = join(TEMPLATES_DIR, newPoll.id + ".html");
	// writeFile(pth, content, err => {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// });
	// TODO: saving
	res.status(STATUS.HTTP_STATUS_CREATED).send(JSON.stringify({poll: {}}));
});

export default create;
