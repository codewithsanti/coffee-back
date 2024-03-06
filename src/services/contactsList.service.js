import { UserNotFound } from '../errors/error-exceptions.js'
import { contactsListRepository, usersRepository } from '../repositories/index.js'


export default class ContactsListService {


    getContacts = async (userId) => {
        const user =  await usersRepository.getById(userId)
        const userList = user.contact_list

        if(!user){
            throw new UserNotFound(`Users not found`)
        }
        const users = await contactsListRepository.getContacts(userList)

        return users
    }

    getRequests = async (userId) => {
        const user =  await usersRepository.getById(userId)
        const userList = user.contact_list

        const requesters = await contactsListRepository.getRequests(userList)
        
        if(!requesters){
            throw new UserNotFound(`No request yet`)
        }
        return requesters
    }

    createList = async (userId) => {
        const user =  await usersRepository.getById(userId)
        
        if(!user){
            throw new UserNotFound(`Owner with ID N°${user._id} not found`)
        }

        const result = await contactsListRepository.createList(userId)

        return result
    }

    addContact = async (userId, contactId) => {
        const user = await usersRepository.getById(userId)
        const userList = user.contact_list
        
        if(!userList){
            throw new UserNotFound(`User with ID N° ${userId} not found`)
        }
        const receptor = await usersRepository.getById(contactId)
        const receptorList = receptor.contact_list
        
        if(!receptorList){
            throw new UserNotFound(`User with ID N° ${contactId} not found`)
        }

        const result = await contactsListRepository.addContact(userList, contactId)
        await contactsListRepository.sendRequest(receptorList, userId)

        return result

    }

    acceptContact = async (userId, contactId) => {
        const user = await usersRepository.getById(userId)
        const userList = user.contact_list

        if(!user){
            throw new UserNotFound(`Owner with ID N° ${user} not found`)
        }

        const receptor = await usersRepository.getById(contactId)
        const receptorList = receptor.contact_list

        if(!receptor){
            throw new UserNotFound(`Contact with ID N° ${contactId} not found`)
        }

        await contactsListRepository.acceptContact(userList, contactId)
        await contactsListRepository.acceptContact(receptorList, userId)
    }

    deleteContact = async(userId, contactId) => {
        const user = await usersRepository.getById(userId)
        const userList = user.contact_list

        const contactData = await usersRepository.getById(contactId)
        const contactList = contactData.contact_list

        if(!user){
            throw new UserNotFound(`Owner with ID N° ${owner} not found`)
        }
        
        const contact = await contactsListRepository.getContact(userList, contactId)

        if(!contact){
            throw new UserNotFound(`Contact with ID N° ${contactId} not found`)
        }
        await contactsListRepository.deleteContact(contactList, userId)

        const result = await contactsListRepository.deleteContact(userList, contactId)

        return result

    }
}