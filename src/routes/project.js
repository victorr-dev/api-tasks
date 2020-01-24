const {Router}=require('express')
const {getProject, postProject, putProject, deleteProject} = require('../controllers/project')

const route = Router()

route.get('/project', getProject)
route.post('/project', postProject)
route.put('/project/:id', putProject)
route.delete('/project/:id', deleteProject)

module.exports = route