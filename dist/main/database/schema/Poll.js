"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = require("shortid");
var Poll = /** @class */ (function () {
    function Poll(choices, dateDue) {
        this._id = shortid.generate();
        this._choices = choices;
        this._dateCreated = new Date();
        this._dateDue = dateDue;
        this._votes = [];
    }
    Object.defineProperty(Poll.prototype, "choices", {
        get: function () {
            return this._choices;
        },
        set: function (value) {
            this._choices = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Poll.prototype, "dateCreated", {
        get: function () {
            return this._dateCreated;
        },
        set: function (value) {
            this._dateCreated = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Poll.prototype, "dateDue", {
        get: function () {
            return this._dateDue;
        },
        set: function (value) {
            this._dateDue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Poll.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Poll.prototype, "votes", {
        get: function () {
            return this._votes;
        },
        set: function (value) {
            this._votes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Poll.prototype, "addVote", {
        set: function (vote) {
            this._votes.push(vote);
        },
        enumerable: true,
        configurable: true
    });
    Poll.prototype.json = function () {
        return {
            dateCreated: this._dateCreated,
            choices: this._choices,
            dateDue: this._dateDue,
            id: this._id,
            votes: this._votes,
        };
    };
    return Poll;
}());
exports.Poll = Poll;
