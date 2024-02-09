import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const conversationCollection = 'conversations'

const conversationSchema = new mongoose.Schema ({
    conversation_name: {
        type: String,
        default: '',
        require: true
    },
    users: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true
        }
    ],
    messages: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'messages',
            require: true
        }
    ],
    created_at: {
        type: String,
        default: new Date().toLocaleString()
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        enum: ['active','deleted'],
        default: 'active'
    }

})

conversationSchema.pre('find', function(){
    this.populate('users')
})
conversationSchema.pre('findOne', function(){
    this.populate('users')
})

conversationSchema.plugin(mongoosePaginate)

const conversationModel = mongoose.model(conversationCollection,conversationSchema)

export default conversationModel