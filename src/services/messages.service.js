import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'
import { conversationsRepository, messagesRepository, usersRepository, contactsListRepository } from '../repositories/index.js'

export default class MessagesService {
  
    async create(message) {
            const user = await usersRepository.getById(message.sender)
            const userList = user.contact_list
            const receiver = await usersRepository.getById(message.receiver)
            const receiverId = receiver._id

    
        const contactExists = await contactsListRepository.isContact(userList, receiverId)

        if(!contactExists) {
            throw new UserNotFound(`El contacto no existe`)
        }

        if(!message.conversation) {

            const user = await usersRepository.getById(message.sender)
            const userId = user._id
            const receiver = await usersRepository.getById(message.receiver)
            const receiverId = receiver._id
            
            const newConver = {
                conversation_name: '',
                created_by: userId
            }
            const conver = await conversationsRepository.create(newConver)
            const converId = conver._id
            
            const newMsg = {
                sender: userId,
                receivers: receiverId,
                content: message.content
            }
            const msg = await messagesRepository.create(newMsg)
            const messageId = msg._id

            //addUserToConver() desde services para validar que no exista.
            await conversationsRepository.addUserToConver(converId, userId)
            //falta user2 en addUserToConver
            await conversationsRepository.addMsgToConver(converId, messageId)
            await usersRepository.addConverToUser(userId, converId)
            await usersRepository.addConverToUser(receiverId, converId)
            await messagesRepository.addConverToMessage(messageId, converId)

        } else {
            const user = await usersRepository.getById(message.sender)
            const userId = user._id
            const receiver = await usersRepository.getById(message.receiver)
            const receiverId = receiver._id


            const conver = await conversationsRepository.getById(message.conversation)
            const converId = conver._id

            const newMsg = {
                sender: userId,
                receivers: receiverId,
                conversation: converId,
                content: message.content
            }
            const msg = await messagesRepository.create(newMsg)
            const msgId = msg._id

            await conversationsRepository.addUserToConver(converId, userId)
            await conversationsRepository.addMsgToConver(converId, msgId)
            await usersRepository.addConverToUser(userId, converId)
            await usersRepository.addConverToUser(receiverId, converId)
        }
        
    }

    async changeState(messageId, state) {
        const message = await messagesRepository.getMsgById(messageId)

        if(!message){
            throw new ElementNotFound(`Mensaje no encontrado`)
        }

        const result = await messagesRepository.changeState(messageId, state)

        return result
    }


}