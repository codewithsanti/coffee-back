import mongoose from 'mongoose'
import config from './config.js'

try {
mongoose.connect(config.mongoUrl)
} catch (error) {
   console.log(error.message) 
}