import express from 'express'
//import { __dirname } from './src/utils/utils.js'
import passport from 'passport'
import startPassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
import routerApp from './routes/app.routes.js'
import './dao/dbConfig.js'


const app = express()
const PORT = process.env.PORT || 3001


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

startPassport()
app.use(passport.initialize())

app.use('/api', routerApp)

app.listen(PORT, ()=> {
    console.log(`Server running and listening on port ${PORT}`)
})