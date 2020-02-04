const User = require('../models/user')
const controller = {}

controller.postUser = async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body
  try {

    const userDb = await User.findOne({ email })
    if (!userDb) return next(Error('User not found'))
    const result = await userDb.comparePassword(password)

    if (!result) return next(Error('Usuario ó contraseña son incorrectos.'))

    console.log(userDb)
    res.send({
      success: true,
      user: userDb,
    })

  } catch (error) {
    return new next(Error(error.message))
  }
}

module.exports = controller