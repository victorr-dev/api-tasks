const {Router}=require('express')
const { verificaToken } = require('../middlewares/auth')
const {getUser, postUser, putUser, deleteUser} = require('../controllers/user')

const route = Router()

route.get('/user', verificaToken, getUser)
route.post('/user', verificaToken, postUser)
route.put('/user/:id', verificaToken, putUser)
route.delete('/user/:id', verificaToken, deleteUser)

module.exports = route
