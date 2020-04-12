const Task = require('../models/task')
const controller = {}

controller.getTask = async (req, res, next) => {
    try {
        const tasks = await Task.find({state:true}).populate('project', 'name')
        if(tasks.length === 0) return next(Error('Tasks not found'))

        res.send({
            success:true,
            tasks
        })
    } catch (error) {
        console.log('Entra aqui');
        return next(Error(error.message))
    }
}

controller.postTask = async(req,res, next) => {
    const newTask = {description, priority, user, project} = req.body

    try {
        const taskEnd = (await Task.find().sort({sort:-1})).shift()

        if(taskEnd){
            newTask.sort = taskEnd.sort + 1000
        } else {
            newTask.sort = 1000
        }

        const task = new Task(newTask)
        const taskSave = await task.save()

        res.send({
            success:true,
            task: taskSave
        })

    } catch (error) {
        return next(Error(error.message))
    }
}

controller.putTask = async(req, res, next) => {
    const { id } = req.params
    const task = {description, priority, user, project} = req.body

    try {
        let result = await Task.findByIdAndUpdate(id, task, {new:true})
        res.send({
            success:true,
            task: result
        })
    } catch (error) {
        return next(Error(error.message))
    }

}

controller.deleteTask = async(req, res, next)=>{
    const {id} = req.params

    try {
        let result = await Task.findByIdAndUpdate(id, {state:false} , {new:true})
        if(!result) return next(Error('Task not found'))
        res.json({
            success:true,
            task: result
        })
    } catch (error) {
        return next(Error(error.message))
    }
}

controller.moveTask = async(req, res , next) => {
    const { taskId } = req.params
    const {beforeId} = req.body

    const beforeTask = await Task.findById(beforeId)

}

module.exports = controller