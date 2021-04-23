import { Socket } from "socket.io"
import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesServices"


io.on("connect", async (Socket) => {
    const connectionsService = new ConnectionsService()
    const messagesService = new MessagesService()

    const allConnectionsWhithoutAdmin = await connectionsService.findAllWithoutAdmin()

    io.emit("admin_list_all_users", allConnectionsWhithoutAdmin)

    Socket.on("admin_list_messages_by_user",async (params, callback) => {
        const { user_id } = params
        
        const allMessages = await messagesService.listByUser(user_id)

        callback(allMessages)
    })

    Socket.on("admin_send_message", async params => {
        const{ user_id, text } = params

        await messagesService.create({
            text,
            user_id,
            admin_id: Socket.id
        })

        const { socket_id } = await connectionsService.findByUserId(user_id)

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: Socket.id
        })

    })

    Socket.on("admin_user_in_support", async params => {
        const { user_id } = params
        await connectionsService.updateAdminID(user_id, Socket.id)

        const allConnectionsWhithoutAdmin = await connectionsService.findAllWithoutAdmin()
        io.emit("admin_list_all_users", allConnectionsWhithoutAdmin)

    })
})