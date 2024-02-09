import ConversationsService from '../services/conversations.service.js'
import { ElementNotFound, UserNotFound } from '../errors/error-exceptions.js'
import ConversationsDAO from '../dao/dbManagers/conversations.dao.js'
import MessagesDAO from '../dao/dbManagers/messages.dao.js'
import UsersDAO from '../dao/dbManagers/users.dao.js'

const conversationsService = new ConversationsService(new ConversationsDAO(), new MessagesDAO(), new UsersDAO())

export default class ConversationsController {
    async getAllConvers(req, res) {
        try {
            const convers = await conversationsService.getAllConvers()

            res.send({status: 'success', convers: convers})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async getConver(req, res) {
        try {
            const { converId } = req.body
                        
            if(!converId) {
                return res.status(404).send({message: `Incomplete values`})
            }
            
            const conver = await conversationsService.getConver(converId)

            res.send({status: 'success', conver: conver})
            
        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message:error.message})
            }
        }
    }

    async createConver(req, res) {
        try {
            const { users, messages, created_by } = req.body

            if( !users || !messages || created_by){
                res.status(400).send({message: 'Missing fields'})
            }

            const conver = await conversationsService.createConver({...req.body})

            res.send({status: 'succes', conver})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async addUserToConver(req, res) {
        try {
            const { userId, converId } = req.body

            if( !userId || !converId ){
                res.status(400).send({message: 'Missing fields'})
            }

            const result = await conversationsService.addUserToConver({...req.body})
            
            res.send({status: 'succes', result})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeName(req, res) {
        try {
            const { userId, name } = req.body
            
            if( !userId || !name ){
                return res.status(400).send({message: 'Missing fields'})
            }
            
            await conversationsService.changeName(userId, name)
            
            res.send({status: 'succes', message: 'Name changed'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    async changeStatus(req, res) {
        try {
            const { userId, status } = req.body
            
            if( !userId || !status ){
                res.status(400).send({message: 'Missing fields'})
            }

            await conversationsService.changeName(userId, status)

            res.send({status: 'succes', message: 'Status changed'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    async deleteConver(req, res) {
        try {
            const { converId } = req.body

            if( !converId ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await conversationsService.deleteConver(converId)

            res.send({status: 'succes', message: 'Conver deleted'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
}
