"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table = `chat.messages`;
const queries = {
    select: {
        by: {
            room: `SELECT * FROM ${table} WHERE room_id=$1 ORDER BY message_date DESC`
        }
    },
    insert: `INSERT INTO ${table} (message_content, user_id, room_id, user_first_name, user_last_name, user_is_critic) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
};
exports.default = queries;
