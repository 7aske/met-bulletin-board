import mongoose, { Model } from "mongoose";
import shortid from "shortid";
import { IPoll } from "../../@types/Poll";

export const PollSchema = new mongoose.Schema({
	questionID: {type: String, default: shortid.generate, unique: true},
	questionText: {type: String, required: true},
	questionOptions: {type: [String], required: true, minlength: 2},
}, {collection: "polls"});

const PollModel: Model<IPoll> = mongoose.model<IPoll>("Poll", PollSchema);

export default PollModel;
