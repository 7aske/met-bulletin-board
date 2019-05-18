import { Router, Request, Response } from "express";

const manage = Router();


manage.get("/", (req: Request, res: Response) => {
	res.send("MANAGE");
});

export default manage;
