import { Router } from "express";
import { constants as STATUS } from "http2";
import { initDatabase } from "../../main/database/initDatabase";
import { Vote } from "../../main/database/schema/Vote";
import { addVote, hasVoted } from "../../main/database/actions/voteActions";

const validate = (pollId: string, choiceId: string, studentId: string) => {
	return pollId != null && choiceId != null && studentId != null;
};

const vote = Router();

vote.get("/", (req, res) => {
	res.status(STATUS.HTTP_STATUS_NOT_FOUND).send(JSON.stringify({status: "NOT FOUND"}));
});

vote.post("/:pollId", async (req, res) => {
	const auth = req.headers["authorization"];
	console.log(req.body);

	if (auth == process.env.KEY) {
		const pollId = req.params["pollId"];
		const choiceId = req.body["choiceId"];
		const studentId = req.body["studentId"];

		const db = await initDatabase();
		const newVote = new Vote(studentId, choiceId);
		if (await hasVoted(db, pollId, studentId) && !validate(pollId, choiceId, studentId)) {
			res.status(STATUS.HTTP_STATUS_BAD_REQUEST).send(JSON.stringify({status: "BAD REQUEST"}));
		} else {
			await addVote(db, pollId, newVote);
			res.status(STATUS.HTTP_STATUS_OK).send(JSON.stringify({status: "OK"}));
		}
	} else {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({status: "UNAUTHORIZED"}));
	}
});

export default vote;
