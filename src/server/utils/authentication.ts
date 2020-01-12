import crypto from "crypto";
import jwt from "jsonwebtoken";

const verifyopts: any = {algorithm: "HS512"};
const signopts: any = {expiresIn: "1h", algorithm: verifyopts.algorithm};

/**
 * Hashes the password using SHA256 hashing algorithm.
 * @param pass - Password to be hashed.
 */
export const hashPass = (pass: string) => {
	const hash = crypto.createHash("sha256");
	hash.update(pass);
	return hash.digest("hex");
};

/**
 * Utility that verifies the login credentials comparing them to admin credentials from 'config.cfg'.
 * @param username
 * @param passwd
 */
export const checkLogin = (username: string, passwd: string): boolean => {
	return username.toLowerCase() == process.env.MBB_USER.toLowerCase() && hashPass(process.env.MBB_PASS) == hashPass(passwd);
};

/**
 * Utility that verifies the validity of the request token.
 * @param token
 */
export const verifyToken = (token: string): boolean => {
	try {
		jwt.verify(token, process.env.SECRET, verifyopts);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * Utility that decodes the JWT token into a JSON object.
 * @param token - Token to be decoded.
 */
export const decodeToken = (token: string): object | string | null => {
	try {
		return jwt.verify(token, process.env.SECRET, verifyopts);
	} catch (e) {
		console.error(e);
		return null;
	}
};

/**
 * Utility that generates the a JWT token for use in authentication.
 * @param username
 */
export const generateToken = (username: string): string => {
	const payload = {
		username: username,
		timestamp: new Date().valueOf(),
	};
	return jwt.sign(payload, process.env.SECRET, signopts);
};

/**
 * Generate one time key that is used for authenticating vote requests.
 */
export const generateKey = (): string => {
	const hash = crypto.createHash("sha256");
	const randnum = Math.random();
	hash.update(randnum.toString());
	return hash.digest().toString("hex");
};
