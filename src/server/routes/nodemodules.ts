import { Router } from "express";
import { existsSync } from "fs";
import { join } from "path";

const nodemodules = Router();

nodemodules.get("/", (req, res) => {
	const pth = join(process.cwd(), req.baseUrl);
	if (existsSync(pth)) {
		res.sendFile(pth);
	} else {
		res.status(404).send("404 NOT FOUND");
	}
});

export default nodemodules;
