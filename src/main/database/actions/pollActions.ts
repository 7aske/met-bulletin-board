import { Poll } from "../schema/Poll";
import { LowdbAsync } from "lowdb";
import { PollsSchemaType } from "../../../@types/PollSchema";

export const addPoll = async (db: LowdbAsync<PollsSchemaType>, poll: Poll) => {
	await db.get("polls").push(poll.json()).write();
};

export const getPolls = async (db: LowdbAsync<PollsSchemaType>) => {
	return await db.get("polls").find().value();
};

export const getPoll = async (db: LowdbAsync<PollsSchemaType>, id: string) => {
	return await db.get("polls").find({id: id}).value();
};

export const removePoll = async (db: LowdbAsync<PollsSchemaType>, id: string) => {
	return await db.get("polls").remove({id: id}).write();
};


