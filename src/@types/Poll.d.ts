import mongoose, { Document } from "mongoose";

export interface IPoll extends Document {
	questionID: string;
	questionText: string;
	questionOptions: string[];
}
