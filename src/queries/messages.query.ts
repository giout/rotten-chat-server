const table = `chat.messages`

const queries = {
    select: {
        by: {
            room: `SELECT * FROM ${table} WHERE room_id=$1 ORDER BY message_date DESC`
        }
    },
    insert: `INSERT INTO ${table} (message_content, user_id, room_id) VALUES ($1, $2, $3) RETURNING *`
}

export default queries