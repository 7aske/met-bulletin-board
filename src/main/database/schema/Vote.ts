import { VoteType } from "../../../@types/Vote";
import shortid from "shortid";

export class Vote implements VoteType {
	private _choice: string;
	private _dateVoted: Date;
	private _id: string;
	private _voteIndex: number;
	private _studentIndex: string;

	constructor(choice: string, studentIndex: string, voteIndex: number) {
		this._id = shortid.generate();
		this._choice = choice;
		this._voteIndex = voteIndex;
		this._studentIndex = studentIndex;
		this._dateVoted = new Date();
	}

	get choice(): string {
		return this._choice;
	}

	set choice(value: string) {
		this._choice = value;
	}

	get dateVoted(): Date {
		return this._dateVoted;
	}

	set dateVoted(value: Date) {
		this._dateVoted = value;
	}

	get id(): string {
		return this._id;
	}

	set id(value: string) {
		this._id = value;
	}

	get voteIndex(): number {
		return this._voteIndex;
	}

	set voteIndex(value: number) {
		this._voteIndex = value;
	}

	get studentIndex(): string {
		return this._studentIndex;
	}

	set studentIndex(value: string) {
		this._studentIndex = value;
	}

	json(): VoteType {
		return {
			studentIndex: this._studentIndex,
			choice: this._choice,
			dateVoted: this._dateVoted,
			id: this._id,
			voteIndex: this._voteIndex
		};
	}
}
