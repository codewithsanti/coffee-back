import Router from './router.routes.js'
import { customStrategy } from '../utils/strategiesEnum.js'
import ContactsController from '../controllers/contacts.controller.js'

const contactsController = new ContactsController()

export default class ContactsRoutes extends Router {
    init(){
        this.get('/contacts', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.getContacts)

        this.get('/requests', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.getRequests)

        this.post('/contact/add', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.addContact)

        this.post('/contact/accept', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.acceptContact)
        
        this.delete('/contact/delete', ['USER', 'ADMIN'], customStrategy.JWT, contactsController.deleteContact)
    }
}