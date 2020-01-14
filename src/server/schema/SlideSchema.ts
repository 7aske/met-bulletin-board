import { Model, Schema, model } from "mongoose";
import shortid from "shortid";
import { PollSchema } from "./PollSchema";
import { ISlide } from "../../@types/Slide";

const SlideSchema = new Schema(
	{
		slideID: {type: String, default: shortid.generate, unique: true},
		slideTitle: {type: String, required: true},
		slideBodyTitle: {type: String, required: true},
		slideBodyText: {type: String, required: true},
		slideImageUrl: {type: String, default: ""},
		poll: {type: Object, default: null, required: false},
	},
	{collection: "slides"},
);
const SlideModel: Model<ISlide> = model<ISlide>("Slide", SlideSchema);

export default SlideModel;
