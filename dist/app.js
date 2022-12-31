"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const connectDB_1 = __importDefault(require("./database/connectDB"));
;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
var whitelist = ["*"];
var corsOptions = {
    origin: whitelist,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.set("trust proxy", 1); // trust first proxy
//Parse Request to body-parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
// app.use(express.urlencoded());
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
// mongoDB connection
(0, connectDB_1.default)();
// Load Routers
app.use("/api/v1", require("./apis/routes/index.routes"));
exports.default = app;
