import { LowdbAsync } from "lowdb";
import { PollsSchemaType } from "../../../@types/PollSchema";
import { Vote } from "../schema/Vote";

export const addVote = async (db: LowdbAsync<PollsSchemaType>, id: string, vote: Vote) => {
	const poll = await db.get("polls").find({id});
	await poll.get("votes").push(vote.json()).write();
};
