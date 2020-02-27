const jwt = require('jsonwebtoken')

const {SEED, TOKEN_EXPIRE} = require('../config/')

const createToken = (user) => {
    return jwt.sign({
         user
    }, SEED, { expiresIn: TOKEN_EXPIRE })
}

module.exports = {
    createToken
}