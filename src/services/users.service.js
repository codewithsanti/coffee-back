import { UserNotFound, UserAlreadyExists, IncorrectLoginCredentials, ElementNotFound} from '../errors/error-exceptions.js'
import { generateToken, hashPass, verify } from '../utils/utils.js'


export default class UsersService {
    constructor(usersDAO, conversationsDAO){
        this.usersDAO = usersDAO
        this.conversationsDAO = conversationsDAO
    }

    async getUsers() {
        const users = await this.usersDAO.getUsers()
        
        if(!users){
            throw new UserNotFound(`Users not found`)
        }

        return users
    }

    async getUserById(userId) {
        const user = await this.usersDAO.getUserById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${user._id} not found`)
        }
        
        return user
    }

    async register(user) {
        const userRegister = await this.usersDAO.getUserByEmailRegister(user.email_register)
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

        const result = await this.usersDAO.create(newUser)
        
        return result
    }

    async login(user) {
        const userData = await this.usersDAO.getUserByEmailRegister(user.email_register)

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
    
    async addConver(userId, converId) {
        const user = await this.usersDAO.getUserById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const conver = await this.conversationsDAO.getConverById(converId)

        if(!conver){
            throw new ElementNotFound(`Conversation with ID N°${converId} not found`)
        }

        const result = await this.usersDAO.addConver(userId, converId)

        return result
    }

    async changeNickName(userId, nickName) {
         const user = await this.usersDAO.getUserById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result = await this.usersDAO.changeNickName(userId, nickName)

        return result
    }

    async changeFirstName(userId, firstName) {
        const user = await this.usersDAO.getUserById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result = await this.usersDAO.changeFirstName(userId, firstName)
        
        return result
    }

    async changeLastName(userId, lastName) {
        const user = await this.usersDAO.getUserById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result = await this.usersDAO.changeLastName(userId, lastName)

        return result
    }

    async deleteUser(userId) {
        const user = await this.usersDAO.getUserById(userId)

        if(!user){
            throw new UserNotFound(`User with ID N°${userId} not found`)
        }

        const result = await this.usersDAO.deleteUser(userId)
        
        return result
    }

}