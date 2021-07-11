const homeRouter = require('./home')
const productRouter = require('./product')
const categoryRouter = require('./category')
const statusRouter = require('./status')
const route = app =>{
    app.use('/home', homeRouter);
    app.use('/products', productRouter);
    app.use('/categories', categoryRouter);
    app.use('/statuses', statusRouter);
}

module.exports = route;