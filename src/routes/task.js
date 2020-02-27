const {Router}=require('express')
const { verificaToken } = require('../middlewares/auth')
const {getTask, postTask, putTask, deleteTask} = require('../controllers/task')

const route = Router()

route.get('/task', verificaToken, getTask)
route.post('/task', verificaToken, postTask)
route.put('/task/:id', verificaToken, putTask)
route.delete('/task/:id', verificaToken, deleteTask)

module.exports = route