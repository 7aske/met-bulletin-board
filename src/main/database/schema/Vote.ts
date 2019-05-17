import { VoteType } from "../../../@types/Vote";
import shortid = require("shortid");

export class Vote implements VoteType {
	private _choice: string;
	private _dateVoted: Date;
	private _id: string;
	private _index: string;

	constructor(choice: string, index: string) {
		this._choice = choice;
		this._dateVoted = new Date();
		this._id = shortid.generate();
		this._index = index;
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

	get index(): string {
		return this._index;
	}

	set index(value: string) {
		this._index = value;
	}

	json(): VoteType {
		return {
			choice: this._choice,
			dateVoted: this._dateVoted,
			id: this._id,
			index: this._index,
		};
	}
}
