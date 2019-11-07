import { Request, Response, NextFunction } from "express";

export const log = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	next()
};
