import { UserNotFound, UserAlreadyExists, IncorrectLoginCredentials, ElementNotFound, ElementAlreadyExist} from '../errors/error-exceptions.js'
import config from '../config/config.js'
import { usersService } from '../services/index.js'

export default class UsersController{
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
            const { first_name, last_name, email_register, password } = req.body

            if( !first_name || !last_name || !email_register || !password  ) {
                return res.status(400).send({message: `Incomplete values`})
            }
            
            const register = await usersService.register({ ...req.body })

            res.send({status: 'success', register})
        

        } catch (error) {
            if(error instanceof UserAlreadyExists){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async login (req, res) {
        try {
            const { email_register, password } = req.body

            if ( !email_register || !password ){
                return res.status(400).send({message: `Incomplete values`})
            }
            
            const accessToken = await usersService.login({...req.body})
            
            res.cookie(
                config.cookieToken, accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
            ).send({message: 'Authorized'})
            
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof IncorrectLoginCredentials){
                return res.status(401).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async addConver (req, res) {
        try {
            const { userId, converId } = req.body

            if( !userId || !converId){
                return res.status(400).send({message: `Incomplete values`})
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


    async getConvers (req, res) {
        try {
            const { userId } = req.body

            if( !userId ){
                return res.status(400).send({message: `Incomplete values`})
            }

            const convers = await usersService.getConvers(userId)

            res.send({status: 'success', convers})
            
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
                return res.status(400).send({message: `Incomplete values`})
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
                return res.status(400).send({message: `Incomplete values`})
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

    async changeLastName (req, res) {
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

    async changeEmailRegister (req, res) {
        try {
            const { userId, emailRegister } = req.body

            if( !userId || !emailRegister){
                return res.status(404).send({message: error.message})
            }

            await usersService.changeEmailRegister(userId, emailRegister)

            res.send({status: 'succes', message: 'Email changed succesfully'})
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeEmailSecondary (req, res) {
        try {
            const { userId, emailSecondary } = req.body

            if( !userId || !emailSecondary){
                return res.status(404).send({message: error.message})
            }

            await usersService.changeEmailSecondary(userId, emailSecondary)

            res.send({status: 'succes', message: 'Email changed succesfully'})
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof ElementAlreadyExist){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }

    async changeVisibility (req, res) {
        try {
            const { userId, visibility } = req.body

            if( !userId || !visibility){
                return res.status(404).send({message: error.message})
            }

            await usersService.changeVisibility(userId, visibility)

            res.send({status: 'succes', message: 'Visibility changed succesfully'})
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof ElementAlreadyExist){
                return res.status(404).send({message: error.message})
            }
            res.status(500).send({message: error.message})
        }
    }
    
    async changeAvatar (req, res) {
        try {
            const { userId, avatar } = req.body

            if( !userId ||!avatar){
                return res.status(404).send({mesage: 'Missing fields'})
            }

            await usersService.changeAvatar(userId, avatar)

            res.send({status: 'succes', message: 'The avatar has changed'})
            
        } catch (error) {
            if(error instanceof UserNotFound){
                return res.status(404).send({message: error.message})
            }
            if(error instanceof ElementAlreadyExist){
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