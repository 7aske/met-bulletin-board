import { Router } from "express";
import { constants as STATUS } from "http2";
import PollModel from "../schema/PollSchema";
import { IPoll } from "../../@types/Poll";

const poll = Router();

/**
 * Fetches all polls if no body supplied. Otherwise finds a poll by 'questionID' if JSON body supplied as follows:
 *  {questionID: "question_id"}
 */
poll.get("/", async (req, res) => {
	const questionID = req.body["questionID"];
	if (questionID) {
		let poll = PollModel.findOne({questionID});
	} else {
		let polls = await PollModel.find();
		res.status(STATUS.HTTP_STATUS_OK).json({polls});
	}
});

/**
 * Updates the slide by questionID property. 'questionID' property is required.
 */
poll.put("/", async (req, res) => {
	let poll: IPoll = req.body;
	try {
		poll = await PollModel.findOneAndUpdate({questionID: poll.questionID}, {...poll}, {new: true});
		res.status(STATUS.HTTP_STATUS_OK).json({poll});
	} catch (e) {
		console.error(e);
		res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
	}
});


/**
 * Deletes the poll by given ID from request body.
 */
poll.delete("/", async (req, res) => {
	const questionID = req.body["questionID"];
	try {
		const r = await PollModel.findOneAndDelete({questionID});
		res.status(STATUS.HTTP_STATUS_OK).json(r);
	} catch (e) {
		console.error(e);
		res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
	}
});


/**
 * Creates a new poll. JSON body should be as follows:
 *  {
 * 		questionID: {type: String, required: false},
 * 		questionText: {type: String, required: true},
 * 		questionOptions: {type: [String], required: true, minlength: 2}
 *  }
 */
poll.post("/", async (req, res) => {
	let poll = req.body;
	poll = new PollModel(poll);
	try {
		poll = await poll.save();
		res.status(STATUS.HTTP_STATUS_OK).json(poll);
	} catch (e) {
		console.error(e);
		res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
	}
});

export default poll;
