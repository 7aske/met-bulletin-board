import { Request, Response, Router } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { constants as STATUS } from "http2";
import { resolve } from "path";

const CLIENT_ROOT: string = resolve(process.cwd(), "dist/server/client");

const authentication = Router();

const hashPass = (pass: string) => {
	const hash = crypto.createHash("sha256");
	hash.update(pass);
	return hash.digest("hex");
};

const checkLogin = (username: string, passwd: string): boolean => {
	return username.toLowerCase() == process.env.MBBUSER.toLowerCase() && hashPass(process.env.MBBPASS) == hashPass(passwd);
};

authentication.post("/login", (req, res) => {
	const username = req.body["mbb_username"];
	const passwd = req.body["mbb_password"];
	const secret = process.env.SECRET;
	const verifyopts: any = {algorithm: "RS512"};
	console.log("login", req.body);
	if (username == undefined || passwd == undefined) {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({status: "UNAUTHORIZED"}));
		return;
	}
	if (checkLogin(username, passwd)) {
		const token = jwt.sign({
			username: username,
			timestamp: new Date().valueOf(),
		}, secret, {expiresIn: "1h"}, verifyopts);
		res.setHeader("Set-Cookie", "Token=" + token + "; Path=/;");
		res.status(STATUS.HTTP_STATUS_OK).json({status: "OK", message: "Logged in", token: token});
	} else {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({
			status: "UNAUTHORIZED",
			message: "Invalid credentials",
			token: null,
		}));
	}
});

authentication.post("/validate", (req: Request, res: Response) => {
	const token = req.body["token"];
	console.log("validate", req.body);

	const secret = process.env.SECRET;
	const verifyopts: any = {algorithm: "RS512"};

	try {
		const verified = jwt.verify(token, secret, verifyopts);
		if (verified) {
			res.status(STATUS.HTTP_STATUS_OK).json({status: "OK", message: "Valid token"});
		} else {
			res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({
				status: "UNAUTHORIZED",
				message: "Invalid token",
			}));
		}
	} catch (e) {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({
			status: "UNAUTHORIZED",
			message: "Invalid token",
		}));
	}
});

export default authentication;
