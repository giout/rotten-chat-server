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
exports.selectMessagesByRoom = exports.insertMessage = void 0;
const database_1 = __importDefault(require("../config/database"));
const messages_query_1 = __importDefault(require("../queries/messages.query"));
const insertMessage = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = messages_query_1.default.insert;
    const { userId, roomId, content } = entry;
    const message = yield database_1.default.query(sentence, [content, userId, roomId]);
    return {
        content: message.rows[0].message_content,
        userId: message.rows[0].user_id,
        roomId: message.rows[0].room_id,
        date: message.rows[0].message_date,
        firstName: message.rows[0].user_first_name,
        lastName: message.rows[0].user_last_name,
        isCritic: message.rows[0].user_is_critic
    };
});
exports.insertMessage = insertMessage;
const selectMessagesByRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = messages_query_1.default.select.by.room;
    const messages = yield database_1.default.query(sentence, [roomId]);
    const response = [];
    messages.rows.map(message => {
        response.push({
            content: message.message_content,
            userId: message.user_id,
            roomId: message.room_id,
            date: message.message_date,
            firstName: message.user_first_name,
            lastName: message.user_last_name,
            isCritic: message.user_is_critic
        });
    });
    return response;
});
exports.selectMessagesByRoom = selectMessagesByRoom;
