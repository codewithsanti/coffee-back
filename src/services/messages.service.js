import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'
import { conversationsRepository, contactsRepository } from '../reporitories/index.js'
export default class MessagesService {
  
    async create(message) {
        const receiver = await contactsRepository.getContact(sender, message.receivers)

        if(!receiver) {
            throw UserNotFound(`User ${message.receiver} is not a contact`)
        }

        //REVEER DESDE ACA.

        if(!message.converId) {
            const newMsg = {
                sender: message.sender,
                receivers: [...message.receivers],
                conversation: message.converId,
                content: message.content,
            }
            const msg = await messageRepository.create(newMsg)

            //esto está mal, debería crear una conversación con parámetros propios...
            //reveer

            const newConver = {
                conversation_name: '',
                users: [ message.sender, message.receiver ],
                created_by: message.sender
            }

            const conver = await conversationsRepository.create(newConver)

            conver.messages.push(conver._id)
            
            await conver.save()

            msg.conversation = conver._id
            
            const result = await msg.save()            

            return result

        } else {
            const conver = await conversationsRepository.getConverById(message.converId)
        
            const newMsg = {
                sender: message.sender,
                receivers: [...message.receivers],
                conversation: message.converId,
                content: message.content,
            }
            
            const result = await messageRepository.create(newMsg)
            
            conver.messages.push(result._id)

            await conver.save()
            
            return result
        }
        
    }

    async changeState(messageId, state) {
        const message = await messageRepository.getMsgById(messageId)

        if(!message){
            throw new ElementNotFound(`Message not found`)
        }

        const result = await messageRepository.changeState(messageId, state)

        return result
    }


}