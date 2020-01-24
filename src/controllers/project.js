const Project = require('../models/project')
const controller = {}

controller.getProject = async (req, res, next) => {
    try {
        const projects = await Project.find({state:true})
        if(projects.length === 0) return next(Error('Projects not found'))

        res.send({
            success:true,
            projects
        })
    } catch (error) {
        return next(Error(error.message))
    }
}

controller.postProject = async(req,res, next) => {
    const {name} = req.body
    try {
        const project = new Project({
            name
        })

        const projectSave = await project.save()

        res.send({
            success:true,
            project: projectSave
        })

    } catch (error) {
        return next(Error(error.message))
    }

}

controller.putProject = async(req, res, next) => {
    const {id} = req.params
    const project  = {name} = req.body

    try {
        let result = await Project.findByIdAndUpdate(id,project,{new:true})
        res.send({
            success:true,
            project: result
        })
    } catch (error) {
        return next(Error(error.message))
    }

}

controller.deleteProject = async(req, res, next)=>{
    const {id} = req.params

    try {
        let result = await Project.findByIdAndUpdate(id, {state:false} , {new:true})
        if(!result) return next(Error('Project not found'))
        res.json({
            success:true,
            project: result
        })
    } catch (error) {
        return next(Error(error.message))
    }
}

module.exports = controller