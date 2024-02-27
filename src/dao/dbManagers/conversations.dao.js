import conversationModel from '../models/conversations.model.js'

export default class ConversationsDAO {
    getAllConvers = async () => { 
        const result = await conversationModel.find().lean()
        return result
    }

    getConverMsgsById = async (converId) => {
        const result = await conversationModel.findOne({_id: converId}, 'messages').lean()
        return result
    }

    getById = async (converId) => {
        const result = await conversationModel.findOne ({_id: converId}).lean()
        return result
    }

    create = async (conver) => {
        const result = await conversationModel.create(conver)
        return result
    }

    addUserToConver = async (converId, userId) => {
        const result = await conversationModel.findOne({_id: converId}).users.push(userId)
        return result
    }

    addMsgToConver = async (converId, messageId) => {
        const result = await conversationModel.findOne({_id: converId}).messages.push(messageId)
        return result
    }

    changeName = async (converId, name) => {
        const result = await conversationModel.findOneAndUpdate({_id: converId}, {conversation_name: name})
        return result 
    }
    changeStatus = async (converId, status) => {
        const result = await conversationModel.findOneAndUpdate({_id: converId},{ status: status })
        return result
    }
    deleteConver = async (converId) => {
        const result = await conversationModel.findOneAndDelete({_id: converId})
        return result
    }

}