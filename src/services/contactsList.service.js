import { UserNotFound } from '../errors/error-exceptions.js'
import { contactsListRepository, usersRepository } from '../repositories/index.js'


export default class ContactsListService {


    getContacts = async (userId) => {
        const users = await contactsListRepository.getContacts(userId)

        if(!users){
            throw new UserNotFound(`Users not found`)
        }

        return users
    }

    getRequests = async (userId) => {
        const user =  await usersRepository.getById(userId)
        const userList = user.contact_list
        //console.log(userList) new ObjectId('65e7cdcf392de5c8126d10a1')

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

    // sendRequest = async (userId, contactId) => {
    //     const owner = await usersRepository.getById(userId)

    //     if(!owner){
    //         throw new UserNotFound(`Owner with ID N° ${userId} not found`)
    //     }

    //     const contact = await usersRepository.getById(contactId)

    //     if(!contact){
    //         throw new UserNotFound(`User with ID N° ${contactId} not found`)
    //     }

    //     const result = await contactsListRepository.sendRequest(userId, contactId)

    //     return result
    // }

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
        const owner = await usersRepository.getById(userId)

        if(!owner){
            throw new UserNotFound(`Owner with ID N° ${owner} not found`)
        }
        
        const contact = await contactsListRepository.getContact(contactId)

        if(!contact){
            throw new UserNotFound(`Contact with ID N° ${contactId} not found`)
        }

        const result = await contactsListRepository(userId, contactId)

        return result

    }
}