const homeRouter = require('./home')
const productRouter = require('./product')
const categoryRouter = require('./category')
const statusRouter = require('./status')
const authRouter = require('./auth')
const loveRouter = require('./love')
const cartRouter = require('./cart')
const accountRouter = require('./account')

const route = app =>{
    app.use('/home', homeRouter);
    app.use('/product', productRouter);
    app.use('/categories', categoryRouter);
    app.use('/statuses', statusRouter);
    app.use('/auth', authRouter);
    app.use('/love', loveRouter);
    app.use('/cart', cartRouter);
    app.use('/account', accountRouter);
}

module.exports = route;