import { LowdbAsync } from "lowdb";
import { PollsSchemaType } from "../../../@types/PollSchema";
import { Vote } from "../schema/Vote";

export const addVote = async (db: LowdbAsync<PollsSchemaType>, id: string, vote: Vote) => {
	const polls = await db.get("polls");
	const poll = await polls.find({id: id});
	await poll.get("votes").push(vote.json()).write();
};

export const getVotes = async (db: LowdbAsync<PollsSchemaType>, id: string) => {
	const polls = await db.get("polls");
	const poll = await polls.find({id: id});
	return await poll.get("votes").value();
};

export const getVoteCount = async (db: LowdbAsync<PollsSchemaType>, id: string, choice: string) => {
	const polls = await db.get("polls");
	const poll = await polls.find({id: id});
	return await poll.get("votes").filter(v => v.choiceIndex.toString(10) == choice).value();
};
export const hasVoted = async (db: LowdbAsync<PollsSchemaType>, id: string, studentId: string) => {
	const polls = await db.get("polls");
	const poll = await polls.find({id: id});
	console.log(poll.get("votes").filter(v => v.studentId == studentId).value());
	return await poll.get("votes").filter(v => v.studentId == studentId).value().length > 0;
};


export const resetVotes = async (db: LowdbAsync<PollsSchemaType>, id: string) => {
	const polls = await db.get("polls");
	const poll = await polls.find({id: id});
	return await poll.assign({votes: []}).write();
};




