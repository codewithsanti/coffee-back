import { UserNotFound } from '../errors/error-exceptions.js'
import ContactsService from '../services/contacts.service.js'

const contactsService = new ContactsService()

export default class ContactsController {
    
    async getContacts (req, res) {
        try {
            const { ownerId } = req.body

            if(!ownerId) return res.status(404).send({message: 'Owner Id is required'})

            const contacts = await contactsService.getContacts(ownerId)

            res.send({status:'succes', contacts})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message}) 
        }
    }
    
    async getRequests (req, res) {
        try {
            const { ownerId } = req.body

            if(!ownerId) return res.status(404).send({message: 'Owner Id is required'})

            const requests = await contactsService.getRequests(ownerId)

            res.send({status:'succes', requests})
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async addContact (req, res) {
        try {
            const { ownerId, contactId } = req.body

            if( !ownerId || !contactId){
                return res.status(404).send({message: 'Missing fields'})
            }

            const contact = await contactsService.addContact(ownerId, contactId)

            res.send({status: 'succes', message:'User added to contacts', contact})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }    

}