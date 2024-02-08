import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'

const userSchema = new Schema({
    _id: {
        index:true
    },
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
        index: true
    },
    avatar_url: {
        type: String,
        default: '/img/avatar_image'
    },
    created_at:{
        type: String,
        date: new Date().toLocaleString()
    },
    status: {
        type: String,
        enum: ['active', 'disactive'],
        default: 'active'
    },
    conversations: [
        {
            type: Schema.Types.ObjectId
        }
    ]
})


userSchema.plugin(mongoosePaginate)


const userModel = model(userCollection, userSchema)

export default userModel
