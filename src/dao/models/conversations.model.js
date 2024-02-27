import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const conversationCollection = 'conversations'

const conversationSchema = new mongoose.Schema ({
    conversation_name: {
        type: String,
        default: ''
    },
    users: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'messages'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
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

conversationSchema.pre('find', function(next){
    this.populate('users messages')
    next()
})

conversationSchema.pre('findOne', function(){
    this.populate('users')
})

conversationSchema.plugin(mongoosePaginate)

const conversationModel = mongoose.model(conversationCollection,conversationSchema)

export default conversationModel