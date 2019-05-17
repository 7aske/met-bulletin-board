import low from "lowdb";
import { resolve } from "path";
import FileAsync from "lowdb/adapters/FileAsync";
import { LowdbAsync } from "lowdb";
import { PollsSchemaType } from "../../@types/PollSchema";
import { pollsSchema } from "./schema/defaults";

export const DB_PATH = resolve(process.cwd(), "database/db.json");
export const DB_ADAPTER = new FileAsync(DB_PATH);

export const initDatabase = async (): Promise<LowdbAsync<PollsSchemaType>> => {
	const db: LowdbAsync<PollsSchemaType> = await low(DB_ADAPTER);
	await db.defaults(pollsSchema).write();
	return db;
};
