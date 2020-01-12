import { Document } from "mongoose";

export interface IVote extends Document {
	voteID: string;
	studentIndex: string;
	questionID: string,
	questionOption: number,
}
