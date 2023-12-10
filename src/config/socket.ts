import { Server as SocketServer } from 'socket.io'
import { Server } from 'http'
import { Message } from '../types/messages.type'
import { insertMessage, selectMessagesByRoom } from '../services/messages.service'

export const config = (srv: Server) => {
    const io = new SocketServer(srv, {
        cors: {
            origin: '*'
        }
    })

    io.on('connection', (socket): void => {
        // events...
        socket.on('enterRoom', async (roomId) => {
            // join room
            socket.join(String(roomId))
            // return all room messages in Message[] type
            const messages = await selectMessagesByRoom(roomId)
            socket.emit('initialMessages', messages)
        })

        socket.on('sendMessage', async (message: Message) => {            
            const { roomId } = message
            // save message in database
            await insertMessage(message)
            // emit a receiveMessage event to roomId room in which the message is the body 
            socket.to(String(roomId)).emit('receiveMessage', message)
        })

        socket.on('leaveRoom', (roomId) => {
            // leave room
            socket.leave(roomId)
        })
    })
}