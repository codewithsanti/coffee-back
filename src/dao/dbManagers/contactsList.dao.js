import contactsListModel from '../models/contactsList.model.js'

export default class ContactsDAO {
    getContacts = async (userId) => {
        const result = await contactsListModel.find({_id: userId}, {state: 'accepted'}).lean()
        return result
    }

    getContact = async (userId, contactId) => {
        const result = await contactsListModel.findOne({_id: userId}, {'contacts.users': { $in: contactId }})
        return result
    }

    getRequests = async (listId) => {
            const result = await contactsListModel.find({_id: listId}, {'contacts.state': null}).lean()
            return result
    }
    
    createList = async () => {
        const result = await contactsListModel.create({})
        return result
    }

    addContact = async (userList, receptorId) => {
        const result = await contactsListModel.findOneAndUpdate({_id: userList}, { $push: {contacts: {user: receptorId, state: null}}})
        return result
    }
    //el _id debe ser de la lista persona.
    sendRequest = async (receptorList, userId) => {
        const result = await contactsListModel.findOneAndUpdate({_id: receptorList}, {$push: {contacts: {user: userId, state: null}}})
        return result
    }

    /*
    this function is used to accept other contacts
    and change the owner state
    */
    acceptContact = async (userId, contactId) => {
        const result = await contactsListModel.findOneAndUpdate({_id: userId, 'contacts.user': contactId}, { $set: { 'contacts.$.state': 'accepted' } })
        return result
    }

    //this function is used to reject new contact
    deleteContact = async (userId, contactId) => {
        const result = await contactsListModel.findOneAndDelete({_id: userId, 'contacts.user': contactId})
        return result
    }
    
}