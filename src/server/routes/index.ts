import { Router } from "express";
import { constants as STATUS } from "http2";
import { join } from "path";
import { existsSync } from "fs";

const index = Router();

const CLIENT_ROOT = "dist/bulletboard-frontend";

index.get("/*", (req, res) => {
	const path = join(process.cwd(), CLIENT_ROOT, req.path);
	const root = join(process.cwd(), CLIENT_ROOT, "index.html");

	if (req.path === "/") {
		res.status(STATUS.HTTP_STATUS_OK).sendFile(root);
	} else if (existsSync(path)) {
		res.status(STATUS.HTTP_STATUS_OK).sendFile(path);
	} else {
		res.status(STATUS.HTTP_STATUS_NOT_FOUND);
	}
});

export default index;
