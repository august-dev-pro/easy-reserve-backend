"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tokenBlacklistSchema = new mongoose_1.default.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});
const tokenBlacklist = mongoose_1.default.model("TokenBlacklist", tokenBlacklistSchema);
exports.default = tokenBlacklist;
