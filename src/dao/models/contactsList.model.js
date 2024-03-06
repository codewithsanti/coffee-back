import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const contactsListCollection = 'contactsList'

const contactListSchema = new mongoose.Schema({
    contacts: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
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

contactListSchema.pre('find', function(){
    this.populate('users')
})

contactListSchema.plugin(mongoosePaginate)


const contactsListModel= new mongoose.model(contactsListCollection, contactListSchema)

export default contactsListModel