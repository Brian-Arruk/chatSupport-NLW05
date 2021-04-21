import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message"
import { MessagesRepository } from "../repositories/MessagesRepository"

interface IMessageCreate {
    admin_id?: string
    text: string
    user_id: string
}

class MessagesService {
    private messagesReposository: Repository<Message>

    constructor() {
        this.messagesReposository = getCustomRepository(MessagesRepository)
    }

    async create({ admin_id, text, user_id }: IMessageCreate) {
        const message = this.messagesReposository.create({
            admin_id,
            text,
            user_id
        })

        await this.messagesReposository.save(message)

        return message;
    }

    async listByUser(user_id: string) {
        const list = await this.messagesReposository.find({
            where: { user_id },
            relations: ["user"]
        })

        return list
    }
}

export { MessagesService }