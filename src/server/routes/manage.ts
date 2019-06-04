import { Router, Request, Response, NextFunction } from "express";
import { initDatabase } from "../../main/database/initDatabase";
import { getPoll, getPolls, removePoll } from "../../main/database/actions/pollActions";
import { getVoteCount, getVotes, resetVotes } from "../../main/database/actions/voteActions";
import { resolve } from "path";

const CLIENT_ROOT: string = resolve(process.cwd(), "dist/server/client");

const manage = Router();

manage.get("/", (req: Request, res: Response, next: NextFunction) => {
	if (req.path == "/") {
		res.sendFile(resolve(CLIENT_ROOT, "views/manage.html"));
	} else {
		next();
	}
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
manage.get("/polls/:id/votes/:voteid", async (req, res) => {
	const pollid = req.params.id;
	const voteid = req.params.voteid;
	const db = await initDatabase();
	const votes = await getVoteCount(db, pollid, voteid);
	if (votes) {
		res.json({pollid, voteid, votes});
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
