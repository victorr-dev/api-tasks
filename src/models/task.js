const {Schema, model} = require('mongoose')
const { getDate } = require('../utils/date-util')

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es requerido']
    },
    description: {
        type:String,
        required:[true, 'La descripción es requerida']
    },
    priority: {
        type:Number,
        default:1,
        enum:[5,4,3,2,1]
    },
    sort: {
        type: Number,
        required:[true, 'El dato sort es requerido']
    },
    status: {
        type: String,
        enum: ['TODO', 'DOING', 'DONE'],
        default: 'TODO'
    },
    created: {
        type: String,
        default: getDate()
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'user', required: true
    },
    project: {
        type: Schema.Types.ObjectId, ref: 'project', required: true
    },
    state:{
        type:Boolean,
        default: true
    }
})


module.exports = model('task', TaskSchema)

