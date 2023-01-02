"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    mongoDb: {
        mongoPass: process.env.MONGO_PASS,
        mongoUser: process.env.MONGO_USER,
    },
};
