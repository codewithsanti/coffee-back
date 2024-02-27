import conctactModel from '../models/contacts.model.js'

export default class ContactsDAO {
    getContacts = async (userId) => {
        const result = await conctactModel.find({owner: userId, state: 'accepted'}).lean()
        return result
    }

    getContact = async (ownerId, userId) => {
        const result = await conctactModel.findOne({owner: ownerId,'contacts._id': { $in: userId }
        })
        return result
    }

    getRequests = async (userId) => {
            const result = await conctactModel.find({owner: userId, state: null}).lean()
            return result
    }
    
    addContact = async (ownerId, contactId) => {
        const result = await conctactModel.findOne({_id: ownerId}).contacts.push({contactId})
        return result
    }

    createList = async (ownerId) => {
        const result = await conctactModel.create({owner: ownerId})
        return result
    }
    
}