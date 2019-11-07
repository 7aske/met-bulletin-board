"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVote = (db, id, vote) => __awaiter(void 0, void 0, void 0, function* () {
    const polls = yield db.get("polls");
    const poll = yield polls.find({ id: id });
    yield poll.get("votes").push(vote.json()).write();
});
exports.getVotes = (db, id) => __awaiter(void 0, void 0, void 0, function* () {
    const polls = yield db.get("polls");
    const poll = yield polls.find({ id: id });
    return yield poll.get("votes").value();
});
exports.getVoteCount = (db, id, choice) => __awaiter(void 0, void 0, void 0, function* () {
    const polls = yield db.get("polls");
    const poll = yield polls.find({ id: id });
    return yield poll.get("votes").filter(v => v.choiceIndex.toString(10) == choice).value();
});
exports.hasVoted = (db, id, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const polls = yield db.get("polls");
    const poll = yield polls.find({ id: id });
    console.log(poll.get("votes").filter(v => v.studentId == studentId).value());
    return (yield poll.get("votes").filter(v => v.studentId == studentId).value().length) > 0;
});
exports.resetVotes = (db, id) => __awaiter(void 0, void 0, void 0, function* () {
    const polls = yield db.get("polls");
    const poll = yield polls.find({ id: id });
    return yield poll.assign({ votes: [] }).write();
});
