import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'
import { conversationsRepository, messagesRepository } from '../repositories/index.js'
import UsersService from './users.service.js'

const usersService = new UsersService()
export default class MessagesService {
  
    async create(message) {

        if(!message.converId) {
            const newMsg = {
                sender: message.sender,
                receivers: message.receivers,
                content: message.content
            }
            
            const newConver = {
                conversation_name: '',
                //users: [ message.sender, message.receivers ],
                created_by: message.sender
            }
            const msg = await messagesRepository.create(newMsg)
            
            const conver = await conversationsRepository.create(newConver)

            conver.messages.push(msg._id)
            conver.users.push(message.sender, ...message.receivers)            
            
            await conver.save()

            await usersService.addConver([message.sender, message.receivers], conver._id)

            msg.conversation = conver._id
            
            const result = await msg.save()            

            return result

        } else {
            const conver = await conversationsRepository.getById(message.converId)
        
            const newMsg = {
                sender: message.sender,
                receivers: message.receivers,
                conversation: message.converId,
                content: message.content,
            }
            
            const result = await messagesRepository.create(newMsg)
            
            conver.messages.push(result._id)

            await conver.save()
            
            await usersService.addConver([message.sender, ...message.receivers], conver._id)

            return result
        }
        
    }

    async changeState(messageId, state) {
        const message = await messagesRepository.getMsgById(messageId)

        if(!message){
            throw new ElementNotFound(`Message not found`)
        }

        const result = await messagesRepository.changeState(messageId, state)

        return result
    }


}