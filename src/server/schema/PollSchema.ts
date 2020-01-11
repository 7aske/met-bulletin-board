import mongoose, { Model } from "mongoose";
import shortid from "shortid";
import { IPoll } from "../../@types/Poll";

export const PollSchema = new mongoose.Schema({
	questionID: {type: String, default: shortid.generate},
	questionText: {type: String, required: true},
	questionOptions: {type: [String], default: []},
}, {collection: "polls"});

const PollModel: Model<IPoll> = mongoose.model<IPoll>("Poll", PollSchema);

export default PollModel;
