import messageModel from '../models/messages.model.js'


export default class messagesDAO {      
    create = async (message) => {
        const result = await messageModel.create(message)
        return result
    }

    addConverToMessage = async (messageId, converId) => {
        const result = await messageModel.findOneAndUpdate({_id: messageId}, {conversation: converId})
        return result
    }

    changeState = async (messageId, state) => {
        const result = await messageModel.findByIdAndUpdate({_id: messageId}, {state: state})
        return result
    }
}