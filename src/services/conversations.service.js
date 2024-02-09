import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'


export default class conversationsService {
    constructor(conversationsDAO, messagesDAO, usersDAO){
        this.conversationsDAO = conversationsDAO
        this.messagesDAO = messagesDAO
        this.usersDAO = usersDAO
    }

    async getAllConvers() {
        const conversations = this.conversationsDAO.getAllConvers()

        if(!conversations){
            throw new ElementNotFound(`Conversations not found`)
        }

        return conversations
    }

    async getConver(converId) {
        const converMessages = this.conversationsDAO.getConverMsgsById(converId)
        
        if(!converMessages){
            throw new ElementNotFound(`Conversation not found`)
        }

        return converMessages
    }

    async createConver(conver) {
        const converCreator = await this.usersDAO.getUserById(conver.created_by)

        const converInvited = await this.usersDAO.getUserById(conver.receiverId)

        if(!converCreator){
            throw new UserNotFound(`User ${conver.created_by} not found`)
        }

        if(!converInvited){
            throw new UserNotFound(`User ${conver.receiverId} not found`)
        }

        /* === conver.initialMsg===
           >> el mensaje con el que el frontend confirma e inicia la conversación. */

        const newConver = {
            conversation_name: 'Mi primera conversación♥',
            users: [ converCreator._id, converInvited._id ],
            messages: [],
            created_by: converCreator._id
        }

        const result = await this.conversationsDAO.createConver(newConver)

        return result
    }

    async addUserToConver (userId, converId) {
        const userToAdd = await this.usersDAO.getUserById(userId)

        if (!userToAdd) {
            throw new UserNotFound(`User ${user.first_name} not found`)
        }
        
        const converExists = await this.conversationsDAO.getConverById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }

        const result = await this.conversationsDAO.addUserToConver(converId, userToAdd._id)

        return result

    }

    //Este método es utilizado por el message service.
    async addMsgToConver(messageId) {
        const converExists = await this.conversationsDAO.getConverById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }
        
        const result = await this.conversationsDAO.addMsgToConver(messageId)

        return result
    }


    async changeName(converId, name) {
        const converExists = await this.conversationsDAO.getConverById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }


        const result = await this.conversationsDAO.changeName(name)
        
        return result
    }

    async changeStatus(converId, status) {
        const converExists = await this.conversationsDAO.getConverById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }

        const result = await this.conversationsDAO.changeStatus(converId, status)
        
        return result
    }

    async deleteConver(converId) {
        const converExists = await this.conversationsDAO.getConverById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }
        
        const result = await this.conversationsDAO.deleteConver(converId)
        return result

    }


}