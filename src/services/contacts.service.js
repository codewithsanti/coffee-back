import { UserNotFound } from '../errors/error-exceptions.js'
import { contactsRepository, usersRepository } from '../reporitories/index.js'


export default class ContactsService {


    getContacts = async (ownerId) => {
        const users = await contactsRepository.getContacts(ownerId)

        if(!users){
            throw new UserNotFound(`Users not found`)
        }

        return users
    }

    getRequests = async (ownerId) => {
        const requesters = await contactsRepository.getRequests(ownerId)
        
        if(!requesters){
            throw new UserNotFound(`No request yet`)
        }
        return requesters
    }

    createList = async (ownerId) => {
        const user =  await usersRepository.getById(ownerId)
        
        if(!user){
            throw new UserNotFound(`Owner with ID N°${user._id} not found`)
        }

        const result = await contactsRepository.createList(ownerId)

        return result
    }

    addContact = async (ownerId, contactId) => {
        const owner = await usersRepository.getById(ownerId)

        if(!owner){
            throw new UserNotFound(`Owner with ID N° ${ownerId} not found`)
        }

        const contact = await usersRepository.getById(contactId)

        if(!contact){
            throw new UserNotFound(`User with ID N° ${contactId} not found`)
        }

        const result = await contactsRepository.addContact(ownerId, contactId)

        return result
    }
}