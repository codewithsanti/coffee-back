import Router from './router.routes.js'
import { customStrategy } from '../utils/strategiesEnum.js'
import ContactsController from '../controllers/contacts.controller.js'

const contactsController = new ContactsController()

export default class ContactsRoutes extends Router {
    init(){
        this.get('/contacts', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.getContacts)

        this.get('/requests', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.getRequests)

        this.post('/contacts', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.addContact)

    }
}