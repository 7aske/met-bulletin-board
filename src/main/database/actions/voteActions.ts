import { LowdbAsync } from "lowdb";
import { PollsSchemaType } from "../../../@types/PollSchema";
import { Vote } from "../schema/Vote";

export const addVote = async (db: LowdbAsync<PollsSchemaType>, id: string, vote: Vote) => {
	const polls = await db.get("polls");
	const poll = await polls.find({id: id});
	await poll.get("votes").push(vote.json()).write();
};
