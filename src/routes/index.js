
module.exports = function(app){
    app.use(require('./user'))
    app.use(require('./project'))
    app.use(require('./task'))
    app.use(require('./login'))
}