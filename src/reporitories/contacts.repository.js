import GenericRepository from './generic.repository.js'

export default class ContactsRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async getContacts (userId) {
        const result = await this.dao.getContacts(userId)
        return result
    }

    async getContact (userId) {
        const result = await this.dao.getContact(listId, userId)
        return result
    }

    async getRequest (userId) {
        const result = await this.dao.getRequests(userId)
        return result
    }

    async createList (userId) {
        const result = await this.dao.createList(userId)
        return result
    }

    async addContact (userId, contactId) {
        const result = await this.dao.addContact(userId, contactId)
        return result
    }
}