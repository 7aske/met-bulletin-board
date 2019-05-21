import { VoteType } from "./Vote";

export interface Choices {
	[key:string]: string;
}

export interface PollType {
	readonly id: string;
	readonly choices: Choices;
	readonly votes: VoteType[];
	readonly dateCreated: Date;
	readonly dateDue: Date;
}
