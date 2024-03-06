import { usersRepository, conversationsRepository, contactsListRepository } from '../repositories/index.js'
import UsersService from './users.service.js'

export const usersService = new UsersService(usersRepository, conversationsRepository, contactsListRepository)
