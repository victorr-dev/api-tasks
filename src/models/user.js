const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const { getDate } = require('../utils/date-util')

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
    },
    created: {
        type: String,
        default: getDate()
    }
})

userSchema.plugin(uniqueValidator, '{PATH} debe de ser único')

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()

    delete userObject.password

    return userObject
}

module.exports = model('user', userSchema)
