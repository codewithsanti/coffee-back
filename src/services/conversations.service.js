import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'
import { conversationsRepository, usersRepository } from '../repositories/index.js'
export default class conversationsService {
    
    async getAllConvers() {
        const conversations = conversationsRepository.getAllConvers()

        if(!conversations){
            throw new ElementNotFound(`Conversations not found`)
        }

        return conversations
    }

    //Este método sólo debe traer información general para mostrar en
    //la lista de conversaciones
    async getConverMessages(converId) {
        const converMessages = conversationsRepository.getConverMessages(converId)
        
        if(!converMessages){
            throw new ElementNotFound(`Conversation not found`)
        }

        return converMessages
    }

    async createConver(conver) {
        
        const converCreator = await usersRepository.getUserById(conver.sender)
        
        const converReceiver = await usersRepository.getUserById(conver.receivers)

        if(!converCreator){
            throw new UserNotFound(`User ${conver.sender} not found`)
        }

        if(!converReceiver){
            throw new UserNotFound(`User ${conver.receivers} not found`)
        }

        const result = await conversationsRepository.createConver(conver)

        return result
    }

    async addUserToConver (userId, converId) {
        const userToAdd = await usersRepository.getUserById(userId)

        if (!userToAdd) {
            throw new UserNotFound(`User ${user.first_name} not found`)
        }
        
        const converExists = await conversationsRepository.getById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }

        const result = await conversationsRepository.addUserToConver(converId, userToAdd._id)

        return result

    }

    async changeName(converId, name) {
        const converExists = await conversationsRepository.getById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }


        const result = await conversationsRepository.changeName(converId,name)
        
        return result
    }

    async changeState(converId, state) {
        const converExists = await conversationsRepository.getById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }

        const result = await conversationsRepository.changeState(converId, state)
        
        return result
    }

    async deleteConver(converId) {
        const converExists = await conversationsRepository.getById(converId)

        if(!converExists) {
            throw new ElementNotFound (`Conversation with ID N°${converId} not exist`)
        }
        
        const result = await conversationsRepository.deleteConver(converId)
        return result

    }


}