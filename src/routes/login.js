const {Router}=require('express')
const {postUser} = require('../controllers/login')

const route = Router()

route.post('/login', postUser)

module.exports = route