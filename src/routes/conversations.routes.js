import Router from './router.routes.js'
import { customStrategy } from '../utils/strategiesEnum.js'
import ConversController from '../controllers/conversations.controller.js'

const conversController = new ConversController()

export default class ConversationsRoutes extends Router {
    init() {
        this.get('/all', ['USER', 'ADMIN'], customStrategy.JWT, conversController.getAllConvers)
        this.get('/conver', ['USER', 'ADMIN'], customStrategy.JWT, conversController.getConver)
        this.get('/conver/messages', ['USER', 'ADMIN'], customStrategy.JWT, conversController.getConverMessages)

        
        this.patch('/invite-user', ['USER', 'ADMIN'], customStrategy.JWT, conversController.addUserToConver)
        this.patch('/conver-name', ['USER', 'ADMIN'], customStrategy.JWT, conversController.changeName)
        this.patch('/conver-state', ['USER', 'ADMIN'], customStrategy.JWT, conversController.changeState)

        this.delete('/conver', ['ADMIN'], customStrategy.JWT, conversController.deleteConver)
    }
}