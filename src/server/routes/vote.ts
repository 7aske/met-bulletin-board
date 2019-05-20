import { Router } from "express";
import { constants as STATUS } from "http2";
import { initDatabase } from "../../main/database/initDatabase";
import { Vote } from "../../main/database/schema/Vote";
import { addVote } from "../../main/database/actions/voteActions";

const vote = Router();

vote.get("/", (req, res) => {
	res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({status: "UNAUTHORIZED"}));
});

vote.post("/:id", async (req, res) => {
	console.log(req.body);
	const id = req.params["id"];
	const choice = req.body["vote"];
	const voteIndex = req.body["id"];
	const studentIndex = req.body["index"];
	const db = await initDatabase();
	const newVote = new Vote(choice, studentIndex, voteIndex);
	await addVote(db, id, newVote);
	res.status(STATUS.HTTP_STATUS_OK).send(JSON.stringify({status: "OK"}));
});

export default vote;
