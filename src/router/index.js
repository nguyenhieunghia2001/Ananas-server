const homeRouter = require('./home')
const route = app =>{
    app.use('/home', homeRouter);
}

module.exports = route;