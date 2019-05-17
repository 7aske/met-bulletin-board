import { Poll } from "./schema/Poll";
import { LowdbAsync } from "lowdb";
import { PollsSchemaType } from "../../@types/PollSchema";

export async function addPoll(db: LowdbAsync<PollsSchemaType>, poll: Poll) {
	await db.get("polls").push(poll.json()).write();
}
