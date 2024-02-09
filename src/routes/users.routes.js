import Router from './router.routes.js'
import { customStrategy } from '../utils/strategiesEnum.js'
import UsersControllers from '../controllers/users.controller.js'

const usersController = new UsersControllers()

export default class UsersRoutes extends Router{

    init() {
        this.get('/', ['USER', 'ADMIN'], customStrategy.JWT, usersController.getUsers)
        this.get('/user', ['USER', 'ADMIN'], customStrategy.JWT, usersController.getUserById)

        this.post('/user/login', ['PUBLIC'], customStrategy.NOTHING, usersController.login)
        this.post('/user/register', ['PUBLIC'], customStrategy.NOTHING, usersController.register)

        this.patch('/user/nickname', ['USER', 'ADMIN'], customStrategy.JWT, usersController.changeNickName)
        this.patch('/user/firstname', ['USER', 'ADMIN'], customStrategy.JWT, usersController.changeFirstName)
        this.patch('/user/lastname', ['USER', 'ADMIN'], customStrategy.JWT, usersController.changeLastName)

        this.delete('/user', ['ADMIN'], customStrategy.JWT, usersController.deleteUser)



    }

}