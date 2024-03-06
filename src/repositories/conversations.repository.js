import GenericRepository from './generic.repository.js'

export default class ConversationsRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async getConvers (converId) {
        const result = await this.dao.getConvers(converId)
        return result
    }

    async getConverMessages (converId) {
        const result = await this.dao.getConverMessages(converId)
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

    async changeState(converId, state) {
        const result = await this.dao.changeState(converId, state)
        return result
    }

}