import { UserNotFound } from '../errors/error-exceptions.js'
import ContactsListService from '../services/contactsList.service.js'

const contactsListService = new ContactsListService()

export default class ContactsController {
    
    async getContacts (req, res) {
        try {
            const { userId } = req.body

            if(!userId) return res.status(404).send({message: 'Owner Id is required'})

            const contacts = await contactsListService.getContacts(userId)

            res.send({status:'success', contacts})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message}) 
        }
    }
    
    async getRequests (req, res) {
        try {
            const { userId } = req.body

            if(!userId) return res.status(404).send({message: 'User Id is required'})

            const requests = await contactsListService.getRequests(userId)

            res.send({status:'success', requests})
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async addContact (req, res) {
        try {
            const { userId, contactId } = req.body

            if( !userId || !contactId){
                return res.status(404).send({message: 'Missing fields'})
            }

            const contact = await contactsListService.addContact(userId, contactId)

            res.send({status: 'succes', message:'User added to contacts', contact})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async sendRequest (req, res) {
        try {
            const { userId, contactId } = req.body

            if( !userId || !contactId){
                return res.status(404).send({message: 'Missing fields'})
            }

            const request = await contactsListService.sendRequest(userId, contactId)

            res.send({status: 'succes', message:'Request sent', request})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    
    async acceptContact (req, res) {
        try {
            const { userId, contactId } = req.body
        
            if(!userId || ! contactId){
                return res.status(404).send({message: 'Misising fields'})
            }

            await contactsListService.acceptContact(userId, contactId)
            
            res.send({ status: 'success' })

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }


    }

    async deleteContact(req, res) {
        try {
            const { userId, contactId } = req.body

            if( !userId || !contactId){
                return res.status(404).send({message: 'Missing fields'})
            }

            const contact = await contactsListService.deleteContact(userId, contactId)

            res.send({status: 'succes', message:'User delted from contacts', contact})


        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
}