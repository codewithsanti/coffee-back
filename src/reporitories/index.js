import { contactsDAO, conversationsDAO, messagesDAO, usersDAO } from '../dao/dbManagers/index.js'
import ContactsRepository from './contacts.repository.js'
import ConvesationsRepository from './conversations.repository.js'
import MessagesRepository from './messages.repository.js'
import UsersRepository from './users.repository.js'



export const contactsRepository = new ContactsRepository(contactsDAO)
export const conversationsRepository = new ConvesationsRepository(conversationsDAO)
export const messagesRepository = new MessagesRepository(messagesDAO)
export const usersRepository = new UsersRepository(usersDAO)