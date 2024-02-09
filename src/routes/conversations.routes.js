import Router from './router.routes.js'
import { customStrategy } from '../utils/strategiesEnum.js'
import ConversationsController from '../controllers/conversations.controller.js'

const converController = new ConversationsController()

export default class ConversationsRoutes extends Router {
    init() {
        this.get('/all', ['USER', 'ADMIN'], customStrategy.JWT, converController.getAllConvers)
        this.get('/conver', ['USER', 'ADMIN'], customStrategy.JWT, converController.getConver)

        this.post('/conver', ['USER', 'ADMIN'], customStrategy.JWT, converController.createConver)

        this.patch('/addmessage', ['USER', 'ADMIN'], customStrategy.JWT, converController.addUserToConver)
        this.patch('/conver-name', ['USER', 'ADMIN'], customStrategy.JWT, converController.changeName)
        this.patch('/conver-status', ['USER', 'ADMIN'], customStrategy.JWT, converController.changeStatus)

        this.delete('/conver', ['ADMIN'], customStrategy.JWT, converController.deleteConver)
    }
}