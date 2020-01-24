const {Router}=require('express')
const {getUser, postUser, putUser, deleteUser} = require('../controllers/user')

const route = Router()

route.get('/user', getUser)
route.post('/user', postUser)
route.put('/user/:id', putUser)
route.delete('/user/:id', deleteUser)

module.exports = route
