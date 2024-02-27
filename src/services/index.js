import { usersRepository, conversationsRepository, contactsRepository } from '../reporitories/index.js'
import UsersService from './users.service.js'

export const usersService = new UsersService(usersRepository, conversationsRepository, contactsRepository)
