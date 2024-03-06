import GenericRepository from './generic.repository.js'

export default class ContactsListRepository extends GenericRepository {
    constructor(dao){
        super(dao)
        this.dao = dao
    }

    async getContacts (userList) {
        const result = await this.dao.getContacts(userList)
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

    async deleteContact(userList, contactId) {
        const result = await this.dao.deleteContact(userList, contactId)
        return result
    }
}