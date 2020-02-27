const {Router}=require('express')
const { verificaToken } = require('../middlewares/auth')
const { getProject, postProject, putProject, deleteProject } = require('../controllers/project')

const route = Router()

route.get('/project', verificaToken, getProject)
route.post('/project', verificaToken, postProject)
route.put('/project/:id',verificaToken, putProject)
route.delete('/project/:id', verificaToken, deleteProject)

module.exports = route