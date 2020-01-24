const {Schema, model} = require('mongoose')

const TaskSchema = new Schema({
    description: {
        type:String,
        required:true
    },
    priority: {
        type:Number,
        required: true,
        enum:[5,4,3,2,1]
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

