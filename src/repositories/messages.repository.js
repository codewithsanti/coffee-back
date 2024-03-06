import GenericRepository from './generic.repository.js'

export default class MessagesRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async changeState (messageId, state) {
        const result = await this.dao.changeState(messageId, state)
        return result
    }
}