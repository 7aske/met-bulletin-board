import mongoose, { Model } from "mongoose";
import shortid from "shortid";
import { PollSchema } from "./PollSchema";
import { ISlide } from "../../@types/Slide";

const SlideSchema = new mongoose.Schema(
	{
		slideID: {type: String, default: shortid.generate},
		slideTitle: {type: String, required: true},
		slideBodyTitle: {type: String, required: true},
		slideBodyText: {type: String, required: true},
		slideImageUrl: {type: String, default: ""},
		poll: {type: PollSchema, default: null},
	},
	{collection: "slides"},
);
const SlideModel: Model<ISlide> = mongoose.model<ISlide>("Slide", SlideSchema);

export default SlideModel;
