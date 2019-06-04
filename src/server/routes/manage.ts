import { Router, Request, Response } from "express";
import { initDatabase } from "../../main/database/initDatabase";
import { getPoll, getPolls, removePoll } from "../../main/database/actions/pollActions";
import { getVotes, resetVotes } from "../../main/database/actions/voteActions";

const manage = Router();

manage.get("/", (req: Request, res: Response) => {
	res.send("MANAGE");
});

manage.get("/polls", async (req, res) => {
	const db = await initDatabase();
	const r = await getPolls(db);
	if (r) {
		res.json(r);
	} else {
		res.json({});
	}
});

manage.get("/polls/:id", async (req, res) => {
	const id = req.params.id;
	const db = await initDatabase();
	const r = await getPoll(db, id);
	if (r) {
		res.json(r);
	} else {
		res.json({});
	}
});
manage.get("/polls/:id/votes", async (req, res) => {
	const id = req.params.id;
	const db = await initDatabase();
	const r = await getVotes(db, id);
	if (r) {
		res.json(r);
	} else {
		res.json({});
	}
});
manage.delete("/polls/:id", async (req, res) => {
	const id = req.params.id;
	const db = await initDatabase();
	const r = await removePoll(db, id);
	if (r) {
		res.json(r);
	} else {
		res.json({});
	}
});
manage.delete("/polls/:id/votes", async (req, res) => {
	const id = req.params.id;
	const db = await initDatabase();
	const r = await resetVotes(db, id);
	if (r) {
		res.json(r);
	} else {
		res.json({});
	}
});



export default manage;
