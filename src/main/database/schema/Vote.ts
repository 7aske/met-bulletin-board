import { VoteType } from "../../../@types/Vote";
import shortid from "shortid";

export class Vote implements VoteType {
	private _choice: string;
	private _dateVoted: Date;
	private _id: string;
	private _choiceIndex: number;
	private _studentId: string;

	constructor(choice: string, studentIndex: string, voteIndex: number) {
		this._id = shortid.generate();
		this._choice = choice;
		this._choiceIndex = voteIndex;
		this._studentId = studentIndex;
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
			choice: this._choice,
			dateVoted: this._dateVoted,
			id: this._id,
			choiceIndex: this._choiceIndex
		};
	}
}
