import contactsListModel from '../models/contactsList.model.js'

export default class ContactsDAO {
    getContacts = async (userList) => {
        const result = await contactsListModel.find({_id: userList}, {'contacts.state': 'accepted'} ).lean()
        return result
    }

    getContact = async (userList, contactId) => {
        const result = await contactsListModel.findOne({_id: userList}, {'contacts.users': contactId}).lean()
        return result
    }

    getRequests = async (listId) => {
            const result = await contactsListModel.find({_id: listId}, {'contacts.state': 'pending'}).lean()
            return result
    }
    
    createList = async () => {
        const result = await contactsListModel.create({})
        return result
    }

    addContact = async (userList, receptorId) => {
        const result = await contactsListModel.findOneAndUpdate({_id: userList}, { $push: {contacts: {user: receptorId}}}, {new: true})
        return result
    }

    sendRequest = async (receptorList, userId) => {
        const result = await contactsListModel.findOneAndUpdate({_id: receptorList}, {$push: {contacts: {user: userId}}})
        return result
    }

    acceptContact = async (userId, contactId) => {
        const result = await contactsListModel.findOneAndUpdate({_id: userId, 'contacts.user': contactId}, { $set: { 'contacts.$.state': 'accepted' } })
        return result
    }


    deleteContact = async (userList, contactId) => {
        const result = await contactsListModel.findOneAndUpdate({_id: userList, 'contacts.user': contactId}, {$pull: { contacts: { user: contactId }}})
        return result
    }
    
}