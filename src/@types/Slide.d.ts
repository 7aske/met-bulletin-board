import { Document } from "mongoose";
import { IQuestion } from "./Poll";

export interface ISlide extends Document {
	slideID: string;
	slideTitle: string;
	slideBodyTitle: string;
	slideBodyText: string;
	slideImageUrl: string;
	poll: IQuestion;
}

