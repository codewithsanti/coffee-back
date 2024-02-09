import messageModel from '../models/messages.model.js'


export default class messagesDAO {      
    createMessage = async (message) => {
        const result = await messageModel.create({message})
        return result
    }

    changeStatus = async (messageId, status) => {
        const result = await messageModel.findByIdAndUpdate({_id: messageId}, {status: status})
        return result
    }
}