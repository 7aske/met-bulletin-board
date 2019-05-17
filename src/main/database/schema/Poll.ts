import { PollType } from "../../../@types/Poll";
import shortid = require("shortid");
import { Vote } from "./Vote";

export class Poll implements PollType{
	private _choices: string[];
	private _dateCreated: Date;
	private _dateDue: Date;
	private _id: string;
	private _votes: Vote[];
	constructor(choices: string[], dateDue: Date) {
		this._id = shortid.generate();
		this._choices = choices;
		this._dateCreated = new Date();
		this._dateDue = dateDue;
		this._votes = [];
	}

	get choices(): string[] {
		return this._choices;
	}

	set choices(value: string[]) {
		this._choices = value;
	}

	get dateCreated(): Date {
		return this._dateCreated;
	}

	set dateCreated(value: Date) {
		this._dateCreated = value;
	}

	get dateDue(): Date {
		return this._dateDue;
	}

	set dateDue(value: Date) {
		this._dateDue = value;
	}

	get id(): string {
		return this._id;
	}

	set id(value: string) {
		this._id = value;
	}

	get votes(): Vote[] {
		return this._votes;
	}

	set votes(value: Vote[]) {
		this._votes = value;
	}

	set addVote(vote: Vote){
		this._votes.push(vote);
	}
	json(): PollType {
		return {
			dateCreated: this._dateCreated,
			choices: this._choices,
			dateDue: this._dateDue,
			id: this._id,
			votes: this._votes,
		}
	}
}
