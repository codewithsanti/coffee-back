import ConversationsRoutes from './conversations.routes.js'
import MessagesRoutes from './messages.routes.js'
import UsersRoutes from './users.routes.js'
import { Router } from 'express'

const conversationsRoutes = new ConversationsRoutes()
const messagesRoutes = new MessagesRoutes()
const usersRoutes = new UsersRoutes()
const router = Router()

router.use('/convers', conversationsRoutes.getRouter())
router.use('/messages', messagesRoutes.getRouter())
router.use('/users', usersRoutes.getRouter())

export default router
