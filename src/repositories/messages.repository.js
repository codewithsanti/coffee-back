import GenericRepository from './generic.repository.js'

export default class MessagesRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async addConverToMessage (messageId, converId) {
        const result = await this.dao.addConverToMessage(messageId, converId)
        return result
    }

    async changeState (messageId, state) {
        const result = await this.dao.changeState(messageId, state)
        return result
    }
}