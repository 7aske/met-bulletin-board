import { VoteType } from "./Vote";

export interface PollType {
	readonly id: string;
	readonly choices: string[];
	readonly votes: VoteType[];
	readonly dateCreated: Date;
	readonly dateDue: Date;
}
