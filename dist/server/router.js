"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var manage_1 = __importDefault(require("./routes/manage"));
var create_1 = __importDefault(require("./routes/create"));
var nodemodules_1 = __importDefault(require("./routes/nodemodules"));
var path_1 = require("path");
var router = express_1.Router();
router.use(express_1.static(path_1.join(process.cwd(), "dist/server/client")));
router.use("/manage", manage_1.default);
router.use("/create", create_1.default);
router.use("/node_modules/*", nodemodules_1.default);
exports.default = router;
