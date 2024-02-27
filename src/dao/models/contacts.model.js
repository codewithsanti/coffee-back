import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const contactCollection = 'contacts'

const contactSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: 'pending',
            state:{
                type: String,
                enum:['accepted', 'blocked'],
                default: null
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    
})

contactSchema.pre('find', function(){
    this.populate('users')
})

contactSchema.plugin(mongoosePaginate)


const conctactModel= new mongoose.model(contactCollection, contactSchema)

export default conctactModel