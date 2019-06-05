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
exports.addPoll = (db, poll) => __awaiter(this, void 0, void 0, function* () {
    yield db.get("polls").push(poll.json()).write();
});
exports.getPolls = (db) => __awaiter(this, void 0, void 0, function* () {
    return yield db.get("polls").value();
});
exports.getPoll = (db, id) => __awaiter(this, void 0, void 0, function* () {
    return yield db.get("polls").find({ id: id }).value();
});
exports.removePoll = (db, id) => __awaiter(this, void 0, void 0, function* () {
    return yield db.get("polls").remove({ id: id }).write();
});
