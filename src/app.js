import express from 'express'
import { __dirname } from './utils/utils.js'
import passport from 'passport'
import startPassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
import routerApp from './routes/app.routes.js'
// import { startSockets } from './websockets/sockets.config.js'
import './dao/dbConfig.js'
import config from './config/config.js'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'


const app = express()
const PORT = config.port || 3001

const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`New sockets has been connected`)

    socket.on('disconnect', () => {
        console.log(`An user has discconected`)
    })
})


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser())



app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))


startPassport()
app.use(passport.initialize())

app.use('/api', routerApp)

server.listen(PORT, ()=> {
    console.log(`Server running and listening on port ${PORT}`)
})

//startSockets(server)