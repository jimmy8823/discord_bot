"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mongoose_1 = require("mongoose");
exports.DB = new mongoose_1.Schema({
    discordId: String,
    count: Number,
});
exports.default = (0, mongoose_1.model)("DBmodel", exports.DB);
