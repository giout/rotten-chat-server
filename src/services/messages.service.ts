import pool from "../config/database"
import { Message } from "../types/messages.type"
import queries from "../queries/messages.query"

export const insertMessage = async (entry: Message) => {
    const sentence = queries.insert
    const { userId, roomId, content, firstName, lastName, isCritic } = entry
    const message = await pool.query(sentence, [content, userId, roomId, firstName, lastName, isCritic]) 
    return {
        content: message.rows[0].message_content,
        userId: message.rows[0].user_id,
        roomId: message.rows[0].room_id,
        date: message.rows[0].message_date,
        firstName: message.rows[0].user_first_name,
        lastName: message.rows[0].user_last_name,
        isCritic: message.rows[0].user_is_critic
    }
}

export const selectMessagesByRoom = async (roomId: number) => {
    const sentence = queries.select.by.room
    const messages = await pool.query(sentence, [roomId])
    const response: Message[] = []
    messages.rows.map(message => {
        response.push({
            content: message.message_content,
            userId: message.user_id,
            roomId: message.room_id,
            date: message.message_date,
            firstName: message.user_first_name,
            lastName: message.user_last_name,
            isCritic: message.user_is_critic
        })
    })
    return response
}