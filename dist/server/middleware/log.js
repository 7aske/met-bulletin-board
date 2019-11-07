"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = (req, res, next) => {
    console.log(req.body);
    next();
};
