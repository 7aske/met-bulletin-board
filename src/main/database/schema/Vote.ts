import { VoteType } from "../../../@types/Vote";
import shortid from "shortid";

export class Vote implements VoteType {
	private _dateVoted: Date;
	private _id: string;
	private _choiceIndex: number;
	private _studentId: string;

	constructor(studentId: string, choiceIndex: number) {
		this._id = shortid.generate();
		this._choiceIndex = choiceIndex;
		this._studentId = studentId;
		this._dateVoted = new Date();
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

	get choiceIndex(): number {
		return this._choiceIndex;
	}

	set choiceIndex(value: number) {
		this._choiceIndex = value;
	}

	get studentId(): string {
		return this._studentId;
	}

	set studentId(value: string) {
		this._studentId = value;
	}

	json(): VoteType {
		return {
			studentId: this._studentId,
			dateVoted: this._dateVoted,
			id: this._id,
			choiceIndex: this._choiceIndex
		};
	}
}
