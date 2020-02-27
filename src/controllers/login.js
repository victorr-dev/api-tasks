const User = require('../models/user')
const { createToken } = require('../utils/create-token')
const controller = {}

controller.postUser = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const userDb = await User.findOne({ email })
    if (!userDb) return next(Error('User not found'))
    const result = await userDb.comparePassword(password)

    if (!result) return next(Error('Usuario ó contraseña son incorrectos.'))

    const token = createToken(userDb)

    res.send({
      success: true,
      user: userDb,
      token
    })

  } catch (error) {
    return new next(Error(error.message))
  }
}

module.exports = controller