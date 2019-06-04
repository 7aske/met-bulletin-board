"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
class Vote {
    constructor(studentId, choiceIndex) {
        this._id = shortid_1.default.generate();
        this._choiceIndex = choiceIndex;
        this._studentId = studentId;
        this._dateVoted = new Date();
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
    get choiceIndex() {
        return this._choiceIndex;
    }
    set choiceIndex(value) {
        this._choiceIndex = value;
    }
    get studentId() {
        return this._studentId;
    }
    set studentId(value) {
        this._studentId = value;
    }
    json() {
        return {
            studentId: this._studentId,
            dateVoted: this._dateVoted,
            id: this._id,
            choiceIndex: this._choiceIndex
        };
    }
}
exports.Vote = Vote;
