import messageModel from '../models/messages.model.js'


export default class messagesDAO {      
    create = async (message) => {
        console.log(message)
        const result = await messageModel.create(message)
        return result
    }

    changeState = async (messageId, state) => {
        const result = await messageModel.findByIdAndUpdate({_id: messageId}, {state: state})
        return result
    }
}