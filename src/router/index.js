const homeRouter = require('./home')
const productRouter = require('./product')
const route = app =>{
    app.use('/home', homeRouter);
    app.use('/product', productRouter);
}

module.exports = route;