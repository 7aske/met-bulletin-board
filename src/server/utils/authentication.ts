import crypto from "crypto";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { constants as STATUS } from "http2";

const verifyopts: any = {algorithm: "HS512"};
const signopts: any = {expiresIn: "1h", algorithm: verifyopts.algorithm};
export const hashPass = (pass: string) => {
	const hash = crypto.createHash("sha256");
	hash.update(pass);
	return hash.digest("hex");
};

export const checkLogin = (username: string, passwd: string): boolean => {
	return username.toLowerCase() == process.env.MBB_USER.toLowerCase() && hashPass(process.env.MBB_PASS) == hashPass(passwd);
};

export const verifyToken = (token: string): boolean => {
	try {
		jwt.verify(token, process.env.SECRET, verifyopts);
		return true;
	} catch (e) {
		return false;
	}
};

export const authorizeRequest = (req: Request, res: Response, next: NextFunction) => {
	const token = req.body["token"] || req.headers["authorization"];

	if (verifyToken(token)) {
		next();
	} else {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).json({
			status: "UNAUTHORIZED",
			message: "Invalid token",
		});
	}
};

export const decodeToken = (token: string): object | string | null => {
	try {
		return jwt.verify(token, process.env.SECRET, verifyopts);
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const generateToken = (username: string): string => {
	const payload = {
		username: username,
		timestamp: new Date().valueOf(),
	};
	return jwt.sign(payload, process.env.SECRET, signopts);
};
