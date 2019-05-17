"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = require("shortid");
var Vote = /** @class */ (function () {
    function Vote(choice, index) {
        this._choice = choice;
        this._dateVoted = new Date();
        this._id = shortid.generate();
        this._index = index;
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
    Object.defineProperty(Vote.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: true,
        configurable: true
    });
    Vote.prototype.json = function () {
        return {
            choice: this._choice,
            dateVoted: this._dateVoted,
            id: this._id,
            index: this._index,
        };
    };
    return Vote;
}());
exports.Vote = Vote;
