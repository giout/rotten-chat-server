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
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const socket_io_1 = require("socket.io");
const messages_service_1 = require("../services/messages.service");
const config = (srv) => {
    const io = new socket_io_1.Server(srv, {
        cors: {
            origin: '*'
        }
    });
    io.on('connection', (socket) => {
        // events...
        socket.on('enterRoom', (roomId) => __awaiter(void 0, void 0, void 0, function* () {
            // join room
            socket.join(String(roomId));
            // return all room messages in Message[] type
            const messages = yield (0, messages_service_1.selectMessagesByRoom)(roomId);
            socket.emit('initialMessages', messages);
        }));
        socket.on('sendMessage', (message) => __awaiter(void 0, void 0, void 0, function* () {
            const { roomId } = message;
            // save message in database
            yield (0, messages_service_1.insertMessage)(message);
            // emit a receiveMessage event to roomId room in which the message is the body 
            socket.to(String(roomId)).emit('receiveMessage', message);
        }));
        socket.on('leaveRoom', (roomId) => {
            // leave room
            socket.leave(roomId);
        });
    });
};
exports.config = config;
