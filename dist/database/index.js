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
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const config = require("../config");
//  remember to replace with appropriate names
let username = config.mongoDb.mongoUser;
let password = config.mongoDb.mongoPass;
const MONGO_URI = `mongodb+srv://${username}:${password}@cluster0.tnwwg.mongodb.net/foodie?retryWrites=true&w=majority`;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // mongodb connection string
        const con = yield mongoose_1.default.connect(MONGO_URI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    }
    catch (err) {
        console.log("Connection broken");
        console.log(err);
        console.log(err.message);
        process.exit(1);
    }
});
exports.default = connectDB;
