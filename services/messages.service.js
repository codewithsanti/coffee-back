import { ElementNotFound } from '../errors/error-exceptions.js'


export default class MessagesService {
    constructor(messageDAO, conversationsDAO){
        this.messageDAO = messageDAO
        this.conversationsDAO = conversationsDAO
    }

    async create(msg) {
        const conver = await this.conversationsDAO.getConverById(msg.converId)

        if(!conver){
            throw new ElementNotFound(`Conversation with ID N°${conver._id} not found`)
        }

        const newMsg = {
            sender: msg.sender,
            receivers: [...msg.receivers],
            conversation: msg.converId,
            content: msg.content,
        }

        const result = await this.messageDAO.createMessage(newMsg)

        await this.conversationsDAO.addMsgToConver(result._id)
        
        return result
    }

    async changeStatus(messageId, status) {
        const message = await this.messageDAO.getMsgById(messageId)

        if(!message){
            throw new ElementNotFound(`Message not found`)
        }

        const result = await this.messageDAO.changeStatus(messageId, status)

        return result
    }


}