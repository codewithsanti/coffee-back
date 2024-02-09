import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    nickname: {
        type: String,
        default: ''
    },
    email_register: {
        type: String,
        required: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        index: true,
        unique: true
    },
    avatar_url: {
        type: String,
        default: '/img/avatar_image'
    },
    created_at:{
        type: String,
        date: new Date().toLocaleString()
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'disactive'],
        default: 'active'
    },
    conversations: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})


userSchema.plugin(mongoosePaginate)


export const userModel = mongoose.model(userCollection, userSchema)


