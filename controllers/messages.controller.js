import MessagesService from '../services/messages.service.js'
import MessagesDAO from '../dao/messages.dao.js'
import ConversationsDAO from '../dao/conversations.dao.js'

const messagesService = new MessagesService(new MessagesDAO(), new ConversationsDAO())

export default class MessagesController {
    async create() {
        try {
            const { sender, receivers, conversation, content } = req.body

            if( !sender || !receivers || !conversation || !content ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await messagesService.create({...req.body})

            res.send({status: 'succes', message: 'Message created succesfully'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeStatus() {
        try {
            const { messageId, status } = req.body

            if( !messageId || !status  ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await messagesService.changeStatus({...req.body})

            res.send({status: 'succes', message: 'Status changed succesfully'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
}
