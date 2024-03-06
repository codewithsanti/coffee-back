import { userModel } from '../models/users.model.js'

export default class usersDAO {
    getAll = async () => {
        const result = await userModel.find().lean()
        return result
    }

    getById = async (userId) => {
        const result = await userModel.findOne({_id: userId})
        return result
    }

    getByState = async (socialState) => {
        const result = await userModel.find({socialState: socialState}).lean()
        return result
    }

    getUserByEmailRegister = async (email) => {
        const result = await userModel.findOne({ email_register: email }).lean()
        return result
    }

    create = async (user) => {
        const result = await userModel.create(user)
        return result
    }

    getConvers = async (userId) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, 'conversations').populate('conversations')
        return result
    }

    addConver = async (userId, converId) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {$push: {conversations: converId}})
        return result
    }

    changeNickName = async (userId, nickName) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {nick_name: nickName})
        return result 
    }

    changeFirstName = async (userId, firstName) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {first_name: firstName})
        return result 
    }

    changeLastName = async (userId, lastName) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {last_name: lastName})
        return result 
    }
    
    changeEmailRegister = async (userId, email) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {email_register: email})
        return result 
    }

    changeEmailSecondary = async (userId, email) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {email_secondary: email})
        return result 
    }

    changeSocialStatus = async (userId, visibility) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {visibility: visibility})
        return result
    }

    changeVisibility = async (userId, visibility) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {visibility: visibility})
        return result 
    }

    changeAvatar = async (userId, avatar) => {
        const result = await userModel.findOneAndUpdate({_id: userId}, {avatar: avatar})
        return result 
    }

    delete = async (userId) => {
        const result = await userModel.findOneAndDelete({_id: userId})
        return result
    }

}
