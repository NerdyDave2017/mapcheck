"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const PORT = config_1.default.port || 9999;
const server = http_1.default.createServer(app_1.default);
process.env.NODE_ENV !== "production" &&
    server.on("listening", () => console.log(`Listening on port http://localhost:${PORT}`));
server.listen(PORT);
