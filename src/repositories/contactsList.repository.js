import GenericRepository from './generic.repository.js'

export default class ContactsListRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async getContacts (userId) {
        const result = await this.dao.getContacts(userId)
        return result
    }

    async getContact (userId, contactId) {
        const result = await this.dao.getContact(userId, contactId)
        return result
    }

    async getRequests (contactId) {
        const result = await this.dao.getRequests(contactId)
        return result
    }

    async createList () {
        const result = await this.dao.createList()
        return result
    }

    async addContact(userList, contactId) {
        const result = await this.dao.addContact(userList, contactId)
        return result
    }
    
    async sendRequest (userId, receptorList) {
        const result = await this.dao.sendRequest(userId, receptorList)
        return result
    }

    async acceptContact(userId, contactId) {
        const result = await this.dao.acceptContact(userId, contactId)
        return result
    }

    async deleteContact(userId, contactId) {
        const result = await this.dao.deleteContact(userId, contactId)
        return result
    }
}