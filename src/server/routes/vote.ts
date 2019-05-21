import { Router } from "express";
import { constants as STATUS } from "http2";
import { initDatabase } from "../../main/database/initDatabase";
import { Vote } from "../../main/database/schema/Vote";
import { addVote } from "../../main/database/actions/voteActions";

const vote = Router();

vote.get("/", (req, res) => {
	res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({status: "UNAUTHORIZED"}));
});

vote.post("/:pollId", async (req, res) => {
	console.log(req.body);
	const pollId = req.params["choiceId"];
	const choice = req.body["choice"];
	const choiceId = req.body["choiceId"];
	const studentIndex = req.body["studentIndex"];
	const db = await initDatabase();
	const newVote = new Vote(choice, studentIndex, choiceId);
	await addVote(db, pollId, newVote);
	res.status(STATUS.HTTP_STATUS_OK).send(JSON.stringify({status: "OK"}));
});

export default vote;
