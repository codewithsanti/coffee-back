import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    receivers: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'conversations'
    },
    content: {
        type: String,
        date: { created_at: new Date().toLocaleString()}
    },
    state: {
        type: String,
        enum: ['active', 'deleted']
    }

})


messageSchema.pre('find', function(){
    this.populate('sender')
        .populate('receiver')
        .populate('conversation')
})


messageSchema.pre('findOne', function(){
    this.populate('receiver')
})

messageSchema.plugin(mongoosePaginate)

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel