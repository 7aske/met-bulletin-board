import { Vote } from "./Vote";

export interface Poll {
	choices: string[];
	votes: Vote[];
	nOfVotes: number;
	dateCreated: Date;
	dateDue: Date;
}
