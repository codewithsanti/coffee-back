import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const messageCollection = 'messages'

const messageSchema = new Schema({
    _id: {
        index: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true,
        unique: true,
        index: true
    },
    receivers: [ 
        {
            type: Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    conversation: {
            type: Schema.Types.ObjectId,
            ref: 'conversations',
            unique: true,
            index: true
    },
    content: {
        type:String,
        created_at: new Date().toLocaleString()
    },
    status: {
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

const messageModel = model(messageCollection, messageSchema)