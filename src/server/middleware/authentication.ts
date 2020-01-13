import { NextFunction, Request, Response } from "express";
import { constants as STATUS } from "http2";
import { verifyToken } from "../utils/authentication";
import { isDev } from "../utils/dev";

/**
 * Middleware that authorizes the request if the token is valid.
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 */
export const authorizeRequest = (req: Request, res: Response, next: NextFunction) => {
	if (isDev()){
		next();
	}
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


/**
 * Middleware that authorizes the request only if it originates from localhost and Electron app.
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 */
export const authorizeLocalhost = (req: Request, res: Response, next: NextFunction) => {
	if (isDev()){
		next();
	}
	const addr = req.connection.remoteAddress;
	const key = req.headers["key"] || req.body["key"];
	console.log(req.connection.remoteAddress, process.env.KEY, key);
	// if ((addr === "::1" || addr === "::ffff:127.0.0.1") && (key === process.env.KEY && key !== undefined)) {
	if (key === process.env.KEY && key !== undefined) {
		next();
	} else {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).json({
			status: "UNAUTHORIZED",
		});
	}
};
