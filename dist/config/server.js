"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_1 = require("./socket");
// creating web server
const app = (0, express_1.default)();
const srv = http_1.default.createServer(app);
(0, socket_1.config)(srv);
exports.default = srv;
