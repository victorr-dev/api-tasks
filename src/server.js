const express = require('express')
const app = express()

app.get('/', (req,res,next)=> {
    res.send({
        success:true,
        message: 'Init project'
    })
})

function errorHandler(err, req, res, next){

}

module.exports = app