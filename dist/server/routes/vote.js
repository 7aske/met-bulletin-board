"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http2_1 = require("http2");
const initDatabase_1 = require("../../main/database/initDatabase");
const Vote_1 = require("../../main/database/schema/Vote");
const voteActions_1 = require("../../main/database/actions/voteActions");
const vote = express_1.Router();
vote.get("/", (req, res) => {
    res.status(http2_1.constants.HTTP_STATUS_UNAUTHORIZED).send(JSON.stringify({ status: "UNAUTHORIZED" }));
});
vote.post("/:pollId", (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.body);
    const pollId = req.params["choiceId"];
    const choice = req.body["choice"];
    const choiceId = req.body["choiceId"];
    const studentIndex = req.body["studentIndex"];
    const db = yield initDatabase_1.initDatabase();
    const newVote = new Vote_1.Vote(choice, studentIndex, choiceId);
    yield voteActions_1.addVote(db, pollId, newVote);
    res.status(http2_1.constants.HTTP_STATUS_OK).send(JSON.stringify({ status: "OK" }));
}));
exports.default = vote;
