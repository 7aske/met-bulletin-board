import { Model, model, Schema } from "mongoose";
import shortid from "shortid";
import { IVote } from "../../@types/Vote";


const VoteSchema = new Schema(
	{
		voteID: {type: String, default: shortid.generate, unique: true},
		studentIndex: {type: String, required: true},
		questionID: {type: String, required: true},
		questionOption: {type: String, required: true},
	},
	{collection: "votes", timestamps: {createdAt: "createdAt"}});

const VoteModel: Model<IVote> = model<IVote>("Vote", VoteSchema);

export default VoteModel;
