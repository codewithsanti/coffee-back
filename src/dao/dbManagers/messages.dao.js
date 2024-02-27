import messageModel from '../models/messages.model.js'


export default class messagesDAO {      
    createMessage = async (message) => {
        //console.log(message) OK
        const result = await messageModel.create({message})
        return result
    }

    changeState = async (messageId, state) => {
        const result = await messageModel.findByIdAndUpdate({_id: messageId}, {state: state})
        return result
    }
}