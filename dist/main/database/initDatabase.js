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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb_1 = __importDefault(require("lowdb"));
const path_1 = require("path");
const FileAsync_1 = __importDefault(require("lowdb/adapters/FileAsync"));
const defaults_1 = require("./schema/defaults");
exports.DB_PATH = path_1.resolve(process.cwd(), "database/db.json");
exports.DB_ADAPTER = new FileAsync_1.default(exports.DB_PATH);
exports.initDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield lowdb_1.default(exports.DB_ADAPTER);
    yield db.defaults(defaults_1.pollsSchema).write();
    return db;
});
