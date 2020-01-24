const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required:[true, 'El name es requerido']
    },
    email: {
        type: String,
        unique:true,
        required: [true, 'El email es requerido.']
    },
    password: {
        type: String,
        required:[true, 'La contraseña es requerida']
    },
    state: {
        type: Boolean,
        default: true
    }
})

userSchema.plugin(uniqueValidator, '{PATH} debe de ser único')

userSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()

    delete userObject.password

    return userObject
}

module.exports = mongoose.model('user', userSchema)
