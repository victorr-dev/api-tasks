const {Schema, model} = require('mongoose')
const { getDate} = require('../utils/date-util')

const ProjectSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    created: {
        type: String,
        default: getDate()
    },
    state: {
        type: Boolean,
        default: true
    }
})


module.exports = model('project', ProjectSchema)

