import { Router } from "express";
import { constants as STATUS } from "http2";

const validate = (pollId: string, choiceId: string, studentId: string) => {
	return pollId != null && choiceId != null && studentId != null;
};

const vote = Router();

vote.get("/", (req, res) => {
	res.status(STATUS.HTTP_STATUS_NOT_FOUND).send(JSON.stringify({status: "NOT FOUND"}));
});

vote.post("/:pollId", async (req, res) => {
	const auth = req.headers["authorization"];
	if (auth == process.env.KEY) {
		res.status(STATUS.HTTP_STATUS_OK).send(JSON.stringify({status: "OK"}));
	} else {
		res.status(STATUS.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({status: "UNAUTHORIZED"}));
	}
});

export default vote;
