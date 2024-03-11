import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'
import { conversationsRepository, usersRepository } from '../repositories/index.js'
export default class conversationsService {
    
  
    //Este método sólo debe traer información general para mostrar en
    //la lista de conversaciones
    async getConverMessages(converId) {
        const converMessages = conversationsRepository.getConverMessages(converId)
        
        if(!converMessages){
            throw new ElementNotFound(`Conversacion no encontrada`)
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
        const userToAddId = userToAdd._id
        
        if (!userToAdd) {
            throw new UserNotFound(`Usuario con Id N°${user._id} no encontrado`)
        }
        
        const converExists = await conversationsRepository.getById(converId)

        if(!converExists) {
            throw new ElementNotFound (`La conversacion con Id N°${converId} no existe`)
        }

        const result = await conversationsRepository.addUserToConver(converId, userToAddId)

        return result

    }

    async changeName(converId, name) {
        const converExists = await conversationsRepository.getById(converId)

        if(!converExists) {
            throw new ElementNotFound (`La conversacion con Id N°${converId} no existe`)
        }


        const result = await conversationsRepository.changeName(converId,name)
        
        return result
    }

    async changeState(converId, state) {
        const converExists = await conversationsRepository.getById(converId)

        if(!converExists) {
            throw new ElementNotFound (`La conversacion con Id N°${converId} no existe`)
        }

        const result = await conversationsRepository.changeState(converId, state)
        
        return result
    }

    async deleteConver(converId) {
        const converExists = await conversationsRepository.getById(converId)

        if(!converExists) {
            throw new ElementNotFound (`La conversacion con Id N°${converId} no existe`)
        }
        
        const result = await conversationsRepository.deleteConver(converId)
        return result

    }


}