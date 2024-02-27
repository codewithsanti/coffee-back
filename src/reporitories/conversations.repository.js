import GenericRepository from './generic.repository.js'

export default class ConversationsRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async getConverMsgs (converId) {
        const result = await this.dao.getConverMsgsById(converId)
        return result
    }

    async addUserToConver (converId, userId) {
        const result = await this.dao.addUserToConver(converId, userId)
        return result
    }

    async addMsgToConver (converId, messageid) {
        const result = await this.dao.addMsgToConver(converId, messageid)
        return result
    }

    async changeName(converId, name) {
        const result = await this.dao.changeName(converId, name)
        return result
    }

    async changeState(converId, status) {
        const result = await this.dao.changeStatus(converId, status)
        return result
    }

}