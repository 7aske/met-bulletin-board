"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = require("path");
var http2_1 = require("http2");
var fs_1 = require("fs");
var initDatabase_1 = require("../../main/database/initDatabase");
var pollActions_1 = require("../../main/database/actions/pollActions");
var Poll_1 = require("../../main/database/schema/Poll");
var TEMPLATES_DIR = path_1.resolve(process.cwd(), "templates");
var CLIENT_ROOT = path_1.resolve(process.cwd(), "dist/server/client");
var create = express_1.Router();
create.get("/", function (req, res, next) {
    if (req.path == "/")
        res.sendFile(path_1.resolve(CLIENT_ROOT, "views/create.html"));
    else
        next();
});
create.post("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, content, choices, db, newPoll, pth;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, content = _a.content, choices = _a.choices;
                return [4 /*yield*/, initDatabase_1.initDatabase()];
            case 1:
                db = _b.sent();
                newPoll = new Poll_1.Poll(choices, new Date());
                return [4 /*yield*/, pollActions_1.addPoll(db, newPoll)];
            case 2:
                _b.sent();
                pth = path_1.join(TEMPLATES_DIR, newPoll.id + ".html");
                fs_1.writeFile(pth, content, function (err) {
                    if (err)
                        console.log(err);
                });
                res.status(http2_1.constants.HTTP_STATUS_CREATED).send(JSON.stringify({ poll: newPoll.json() }));
                return [2 /*return*/];
        }
    });
}); });
exports.default = create;
