const User = require('../models/user')
const controller = {}

controller.getUser = async (req, res, next) => {
    try {
        const users = await User.find({state:true})
        if(users.length === 0) return next(Error('User not found'))

        res.send({
            success:true,
            users
        })
    } catch (error) {
        return next(Error(error.message))
    }
}

controller.postUser = async(req,res, next) => {
    const {name, email, password} = req.body
    try {
        const user = new User({
            name,
            email,
            password
        })

        const userSave = await user.save()

        res.send({
            success:true,
            user: userSave
        })

    } catch (error) {
        return next(Error(error.message))
    }

}

controller.putUser = async(req, res, next) => {
    const {id} = req.params
    const user = {name, email} = req.body

    try {
        let result = await User.findByIdAndUpdate(id,user,{new:true, runValidators:true})
        res.send({
            success:true,
            usuario: result
        })
    } catch (error) {
        return next(Error(error.message))
    }

}

controller.deleteUser = async(req, res, next)=>{
    const {id} = req.params

    try {
        let result = await User.findByIdAndUpdate(id, {state:false} , {new:true, runValidators:true})
        if(!result) return next(Error('User not found'))
        res.json({
            success:true,
            usuario: result
        })
    } catch (error) {
        return next(Error(error.message))
    }
}

module.exports = controller