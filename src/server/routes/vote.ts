import { Router } from "express";
import { constants as STATUS } from "http2";
import VoteModel from "../schema/VoteSchema";
import { IVote } from "../../@types/Vote";
import PollModel from "../schema/PollSchema";

const vote = Router();

/**
 * Returns the list of all votes. If JSON body is supplied with 'questionID' returns all votes for the given question.
 * If in addition to 'questionID' the 'questionOption' is supplied, returns the list of all votes for the given question with that option.
 * {
 *     "questionID": "question_id",
 *     "questionOption": "question_option"
 * }
 * If 'count' is supplied and set is set to true returns only the count of votes.
 */
vote.get("/", async (req, res) => {
	const questionID = req.body["questionID"];
	const questionOption = req.body["questionOption"];
	const count = req.body["count"];
	if (questionID) {
		const query: any = {questionID};
		questionOption && (query["questionOption"] = questionOption);
		console.log(query === true);
		let votes: any = await VoteModel.find(query);
		if (count) {
			votes = votes.length;
		}
		res.status(STATUS.HTTP_STATUS_OK).json({...query, votes});
	} else {
		let votes: any = await VoteModel.find();
		if (count) {
			votes = votes.length;
		}
		res.status(STATUS.HTTP_STATUS_OK).json({votes});
	}
});

/**
 * Creates a new vote. Vote is saved if the a poll with 'questionID' exists and if student hasn't already voted for the same poll.
 * JSON body should be as follows:
 * {
 *     "questionID": "question_id",
 *     "studentIndex": "student_index",
 *     "questionOption": "question_option",
 * }
 *
 * Returns status code 201 on successful vote.
 */
vote.post("/", async (req, res) => {
	let vote: IVote = req.body;
	vote = new VoteModel(vote);

	try {
		const poll = await PollModel.findOne({questionID: vote.questionID});
		if (poll) {
			const oldvote = await VoteModel.findOne({studentIndex: vote.studentIndex});
			if (!oldvote) {
				vote = await vote.save();
				res.status(STATUS.HTTP_STATUS_CREATED).json(vote);
			} else {
				res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json({
					questionID: vote.questionID,
					studentIndex: vote.studentIndex,
					message: `Student with index ${vote.studentIndex} has already voted`,
				});
			}
		} else {
			res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json({
				questionID: vote.questionID,
				message: `Question with ID ${vote.questionID} doesn't exist`,
			});
		}
	} catch (e) {
		console.error(e);
		res.status(STATUS.HTTP_STATUS_BAD_REQUEST).json(e);
	}
});

export default vote;
