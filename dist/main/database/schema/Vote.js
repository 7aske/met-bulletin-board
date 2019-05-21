"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
class Vote {
    constructor(choice, studentIndex, voteIndex) {
        this._id = shortid_1.default.generate();
        this._choice = choice;
        this._voteIndex = voteIndex;
        this._studentIndex = studentIndex;
        this._dateVoted = new Date();
    }
    get choice() {
        return this._choice;
    }
    set choice(value) {
        this._choice = value;
    }
    get dateVoted() {
        return this._dateVoted;
    }
    set dateVoted(value) {
        this._dateVoted = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get voteIndex() {
        return this._voteIndex;
    }
    set voteIndex(value) {
        this._voteIndex = value;
    }
    get studentIndex() {
        return this._studentIndex;
    }
    set studentIndex(value) {
        this._studentIndex = value;
    }
    json() {
        return {
            studentIndex: this._studentIndex,
            choice: this._choice,
            dateVoted: this._dateVoted,
            id: this._id,
            voteIndex: this._voteIndex
        };
    }
}
exports.Vote = Vote;
