import { UserNotFound, UserAlreadyExists, IncorrectLoginCredentials, ElementNotFound} from '../errors/error-exceptions.js'
import UsersService from '../services/users.service.js'
import UsersDAO from '../dao/users.dao.js'
import ConversationsDAO from '../dao/conversations.dao.js'

const usersService = new UsersService(new UsersDAO(), new ConversationsDAO())

export default class UsersControllers{
    async getUsers (req, res) {
        try {
            const users = await usersService.getUsers()

            res.send({status: 'success', users})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async getUserById (req, res) {
        try {
            const { userId } = req.body
            
            if(!userId) {
                return res.status(400).send({message: `Missing fields`})
            }

            const user = await usersService.getUserById(userId)

            res.send({status: 'success', user})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async register (req, res) {
        try {
            const { first_name, last_name, email_register, password, avatar_url } = req.body

            if( !first_name || !last_name || !email_register || !password || !avatar_url ) {
                return res.status(400).send({message: `Missing fields`})
            }
            
            const register = await usersService.register({ ...req.body })

            res.send({status: 'success', register})
        

        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    async login (req, res) {
        try {
            const { email_register, password } = req.body

            if ( !email_register || !password ){
                return res.status(400).send({message: `Missing fields`})
            }

            const accessToken = await usersService.login({...req.body})

            res.cookie(
                config.cookieToken, accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
            ).send({message: 'Authorized'})
            
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof UserAlreadyExists){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async addConver (req, res) {
        try {
            const { userId, converId } = req.body

            if( !userId || !converId){
                return res.status(400).send({message: `Missing fields`})
            }

            await usersService.addConver({...req.body})

            res.send({status: 'success'})
            
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

    async changeNickName (req, res) {
        try {
            const { userId, nickName } = req.body

            if( !userId || !nickName ){
                return res.status(400).send({message: `Missing fields`})
            }

            const user = await usersService.changeNickName({...req.body})

            res.send({status: 'success', message: `User nickname has benn changed to ${user.nickname}`})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeFirstName (req, res) {
        try {
            const { userId, firstName } = req.body

            if( !userId || !firstName ){
                return res.status(400).send({message: `Missing fields`})
            }

            const user = await usersService.changeFirstName({...req.body})
            
            res.send({status: 'success', message: `User first name has been changed to ${user.first_name}`})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changelastName (req, res) {
        try {
            const { userId, lastName } = req.body

            if( !userId || !lastName ){
                return res.status(400).send({message: `Missing fields`})
            }

            const user = await usersService.changeLastName({...req.body})
            
            res.send({status: 'success', message: `User lastname has been changed to ${user.last_name}`})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async deleteUser (req, res) {
        try {
            const { userId } = req.body

            if(!userId){
                return res.status(400).send({message: `Missing fields`})
            }

            const userDelete = await  usersService.deleteUser(userId)

            res.send({status: 'succes', message: `User with ID${userDelete._id} was deleted`})

        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

}