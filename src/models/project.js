const {Schema, model} = require('mongoose')

const ProjectSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    state: {
        type: Boolean,
        default: true
    }
})


module.exports = model('project', ProjectSchema)

