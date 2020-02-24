const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const { URL } = require('./config')
const app = express()
app.use(cors())

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.json())

//Load Routes
require('./routes')(app)

//Handle Errors
app.use(errorHandler)

function errorHandler(err, req, res, next) {
  if (err.message.match(/not found/)) {
    return res.send({
      success: false,
      error: err.message
    })
  }
  res.status(400).send({
    success: false,
    error: err.message
  })
}

app.connectDb = async () => {
  const configConnection = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  try {
    await mongoose.connect(URL, configConnection)
    console.log('Conexion establecida a la base de datos')
    if(process.env.NODE_ENV === 'test'){
      await mongoose.connection.db.dropDatabase()
      console.log('Clear Database');
    }
  } catch (error) {
    console.error(error.reason)
    process.exit(1)
  }
}

module.exports = app