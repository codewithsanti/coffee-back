import { UserNotFound, UserAlreadyExists, IncorrectLoginCredentials, ElementNotFound, ElementAlreadyExist} from '../errors/error-exceptions.js'
import { generateToken, hashPass, verify } from '../utils/utils.js'
import { usersRepository, conversationsRepository, contactsListRepository } from '../repositories/index.js'

export default class UsersService {

    async getUsers() {
        const users = await usersRepository.getAll()
        
        if(!users){
            throw new UserNotFound(`Users not found`)
        }

        return users
    }

    async getById(userId) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${user._id} not found`)
        }
        
        return user
    }

    async register(user) {
        const userRegister = await usersRepository.getUserByEmailRegister(user.email_register)
        if(userRegister){
            throw new UserAlreadyExists(`User email ${user.email_register} already exist, please try with another email.`)
        }

        const newUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email_register: user.email_register,
            avatar_url: user.avatar_url || ''
        }

        const passwordHashed = hashPass(user.password)

        newUser.password = passwordHashed

        const result = await usersRepository.create(newUser)
        
        await this.addContactList(result._id)
        
        return result
    }

    async login(user) {
        const userData = await usersRepository.getUserByEmailRegister(user.email_register)

        if(!userData){
            throw new UserNotFound(`User ${user.email_register} not found`)
        }

        const validatePass = verify(user.password, userData.password)

        if(!validatePass){
            throw new IncorrectLoginCredentials(`Incorrect Credentials`)
        }

        const accessToken = generateToken(userData)

        return accessToken
    }

    async createContact(userId, contactId) {
        const user = await usersRepository.getById(userId)
        
        if(!user){
            throw new UserNotFound(`User with ID N°${user._id} not found`)
        }

        const userContact= await usersRepository.getById(contactId)

        if(!userContact){
            throw new UserNotFound(`User Contact with ID N°${user._id} not found`)
        }

        const result = await usersRepository.addContact(userId, contactId)


        return result
    }
    
    async addConver(usersId, converId) {
        const conver = await conversationsRepository.getById(converId)

        if(!conver){
            throw new ElementNotFound(`Conversation with ID N°${converId} not found`)
        }

        const result =await Promise.all(
            usersId.map( async (userId) => {
                const user = await usersRepository.getById(userId)
                if(!user){
                    throw new UserNotFound(`User with ID N°${userId} not found`)
                }
                user.conversations.push(conver._id)
                await user.save()
            })
        )

        return result
    }

    async addContactList (userId) {
        const user = await usersRepository.getById(userId)
        
        if(!user){
            throw new UserNotFound(`User with ID N°${user._id} not found`)
        }

        const list = await contactsListRepository.createList()
        //console.log(list) returns null
        user.contact_list = list._id

        const result = await user.save()
       
        return result
    }

    async getConvers(userId) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const convers = await usersRepository.getConvers(userId)

        if(!convers){
            throw new ElementNotFound(`There's no conversations`)
        }

        return convers

    }

    async changeNickName(userId, nickName) {
         const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result = await usersRepository.changeNickName(userId, nickName)

        return result
    }

    async changeFirstName(userId, firstName) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result = await usersRepository.changeFirstName(userId, firstName)
        
        return result
    }

    async changeLastName(userId, lastName) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result = await usersRepository.changeLastName(userId, lastName)

        return result
    }
    
    async changeEmailRegister(userId, emailRegister){
        const user = await usersRepository.getById(userId)
        if(!user){
            throw new UserNotFound(`User with ID N° ${userId} not found`)
        }

        if(newEmail === user.email_register){
            throw new ElementAlreadyExist(`New email cannot be the same. Please try with another email`)
        }

        const result = await usersRepository.changeEmailRegister(userId, emailRegister)

        return result
    }

    async changeEmailSecondary(userId, emailSecondary){
        const user = await usersRepository.getById(userId)
        if(!user){
            throw new UserNotFound(`User with ID N° ${userId} not found`)
        }

        if(user.email_secondary === newEmail){
            throw new ElementAlreadyExist(`New email cannot be the same. Please try with another email`)
        }

        const result = await usersRepository.changeEmailSecondary(userId, emailSecondary)

        return result
    }

    async changeVisibility(userId, visibility){
        const user = await usersRepository.getById(userId)
        
        if(!user){
            throw new UserNotFound(`User with ID N° ${userId} not found`)
        }

        if(user.visibility === visibility) {
            throw new ElementAlreadyExist(`The cannot be changed`)
        }

        const result = await usersRepository.changeVisibility(userId, visibility)

        return result
    }

    async changeAvatar(userId, newAvatar) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result =  await usersRepository.changeAvatar(userId, newAvatar)

        return result
    }

    async deleteUser(userId) {
        const user = await usersRepository.getById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result = await usersRepository.deleteUser(userId)
        
        return result
    }

}