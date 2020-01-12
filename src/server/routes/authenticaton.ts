import { Request, Response, Router } from "express";
import { constants as STATUS } from "http2";
import { resolve } from "path";
import { checkLogin, generateToken, verifyToken } from "../utils/authentication";

const CLIENT_ROOT: string = resolve(process.cwd(), "dist/server/client");

const authentication = Router();

/**
 * Generate JWT token if login credentials are valid. Expects JSON body as follows:
 * {
 *     "mbb_username": "username",
 *     "mbb_password": "password"
 * }
 *
 * Returns on valid login:
 * {
 * 		"token": "generated_jtw_token"
 * }
 * Also sets the 'Set-Cookie' header with 'Token=generated_jtw_token'.
 */
authentication.post("/login", (req, res) => {
	const username = req.body["mbb_username"];
	const passwd = req.body["mbb_password"];

	if (username == undefined || passwd == undefined) {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).json({status: "UNAUTHORIZED"});
		return;
	}
	if (checkLogin(username, passwd)) {
		const token = generateToken(username);
		res.setHeader("Set-Cookie", "Token=" + token + "; Path=/;");
		res.status(STATUS.HTTP_STATUS_OK).json({status: "OK", message: "Logged in", token: token});
	} else {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).json({
			status: "UNAUTHORIZED",
			message: "Invalid credentials",
			token: null,
		});
	}
});

/**
 * Validates supplied JWT token.
 * Token is either in the body as
 * {
 * 		"token": "jwt_token"
 * }
 * or as 'Authorization' header.
 */
authentication.post("/validate", (req: Request, res: Response) => {
	const token = req.body["token"] || req.headers["authorization"];

	if (verifyToken(token)) {
		res.status(STATUS.HTTP_STATUS_OK).json({status: "OK", message: "Valid token"});
	} else {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).json({
			status: "UNAUTHORIZED",
			message: "Invalid token",
		});
	}
});

export default authentication;
