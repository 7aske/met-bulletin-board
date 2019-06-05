import { Request, Response, NextFunction, Router } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { constants as STATUS } from "http2";
import { resolve } from "path";

const CLIENT_ROOT: string = resolve(process.cwd(), "dist/server/client");

const auth = Router();

const hashPass = (pass: string) => {
	const hash = crypto.createHash("sha256");
	hash.update(pass);
	return hash.digest("hex");
};

const checkLogin = (username: string, passwd: string): boolean => {
	return username.toLowerCase() == process.env.DB_USER.toLowerCase() && hashPass(process.env.DB_USER) == hashPass(passwd);
};

auth.get("/login", (req, res) => {
	const token = req.cookies["Token"];
	const secret = process.env.SECRET;
	const verifyopts: any = {algorithm: "RS512"};
	if (!token) {
		res.sendFile(resolve(CLIENT_ROOT, "views/login.html"));
		return;
	}
	try {
		const verified = jwt.verify(token, secret, verifyopts);
		if (verified) {
			res.redirect("/manage");
		} else {
			res.clearCookie("Token");
			res.sendFile(resolve(CLIENT_ROOT, "views/login.html"));
		}
	} catch (e) {
		res.clearCookie("Token");
		res.sendFile(resolve(CLIENT_ROOT, "views/login.html"));
	}
});

auth.post("/login", (req, res) => {
	const username = req.body["mbb-username"];
	const passwd = req.body["mbb-passwd"];
	const secret = process.env.SECRET;
	const verifyopts: any = {algorithm: "RS512"};

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
		res.redirect("/manage");
	} else {
		res.redirect("/login");
	}

});

auth.get("/*", (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies["Token"];
	const auth = req.headers["authorization"];
	const key = process.env.KEY;
	if (req.url == "/images/default-bg.png") {
		res.sendFile(resolve(CLIENT_ROOT, "images/default-bg.png"));
		return;
	}
	if (auth) {
		if (auth == key) {
			next();
			return;
		}
	}
	const secret = process.env.SECRET;
	const verifyopts: any = {algorithm: "RS512"};

	if (!token) {
		res.redirect("/login");
		return;
	}
	try {
		const verified = jwt.verify(token, secret, verifyopts);
		if (verified) {
			next();
		} else {
			res.redirect("/login");
		}
	} catch (e) {
		res.redirect("/login");
	}
});

export default auth;
