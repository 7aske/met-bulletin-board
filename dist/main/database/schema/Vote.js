"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shortid_1 = __importDefault(require("shortid"));
var Vote = /** @class */ (function () {
    function Vote(choice, studentIndex, voteIndex) {
        this._id = shortid_1.default.generate();
        this._choice = choice;
        this._voteIndex = voteIndex;
        this._studentIndex = studentIndex;
        this._dateVoted = new Date();
    }
    Object.defineProperty(Vote.prototype, "choice", {
        get: function () {
            return this._choice;
        },
        set: function (value) {
            this._choice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vote.prototype, "dateVoted", {
        get: function () {
            return this._dateVoted;
        },
        set: function (value) {
            this._dateVoted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vote.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vote.prototype, "voteIndex", {
        get: function () {
            return this._voteIndex;
        },
        set: function (value) {
            this._voteIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vote.prototype, "studentIndex", {
        get: function () {
            return this._studentIndex;
        },
        set: function (value) {
            this._studentIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Vote.prototype.json = function () {
        return {
            studentIndex: this._studentIndex,
            choice: this._choice,
            dateVoted: this._dateVoted,
            id: this._id,
            voteIndex: this._voteIndex
        };
    };
    return Vote;
}());
exports.Vote = Vote;
