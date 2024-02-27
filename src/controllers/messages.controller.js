import { ElementNotFound, UserNotFound  } from '../errors/error-exceptions.js'
import MessagesServices from '../services/messages.service.js'

const messagesService = new MessagesServices()
export default class MessagesController {

    async create (req,res) {
        try {
            const { sender, receivers, content } = req.body

            if( !sender || !receivers || !content ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await messagesService.create({...req.body})

            res.send({status: 'succes', message: 'Message created succesfully'})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }

            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeState (req, res) {
        try {
            const { messageId, status } = req.body

            if( !messageId || !status  ){
                return res.status(400).send({message: 'Missing fields'})
            }

            await messagesService.changeState({...req.body})

            res.send({status: 'succes', message: 'Status changed succesfully'})

        } catch (error) {
            if(error instanceof ElementNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
}
