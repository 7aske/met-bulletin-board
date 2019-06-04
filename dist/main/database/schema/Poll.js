"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = require("shortid");
class Poll {
    constructor(choices, dateDue) {
        this._id = shortid.generate();
        this._choices = choices;
        this._dateCreated = new Date();
        if (dateDue)
            this._dateDue = dateDue;
        else
            this._dateDue = null;
        this._votes = [];
    }
    get choices() {
        return this._choices;
    }
    set choices(value) {
        this._choices = value;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    set dateCreated(value) {
        this._dateCreated = value;
    }
    get dateDue() {
        return this._dateDue;
    }
    set dateDue(value) {
        this._dateDue = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get votes() {
        return this._votes;
    }
    set votes(value) {
        this._votes = value;
    }
    set addVote(vote) {
        this._votes.push(vote);
    }
    json() {
        return {
            dateCreated: this._dateCreated,
            choices: this._choices,
            dateDue: this._dateDue,
            id: this._id,
            votes: this._votes,
        };
    }
}
exports.Poll = Poll;
