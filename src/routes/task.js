const {Router}=require('express')
const {getTask, postTask, putTask, deleteTask} = require('../controllers/task')

const route = Router()

route.get('/task', getTask)
route.post('/task', postTask)
route.put('/task/:id', putTask)
route.delete('/task/:id', deleteTask)

module.exports = route