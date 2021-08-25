const homeRouter = require('./home')
const productRouter = require('./product')
const categoryRouter = require('./category')
const statusRouter = require('./status')
const authRouter = require('./auth')
const loveRouter = require('./love')
const cartRouter = require('./cart')
const accountRouter = require('./account')
const accountAdminRouter = require('./accountAdmin')
const addressRouter = require('./address')
const historyRouter = require('./history')
const purchaseRouter = require('./purchase')
const sizeRouter = require('./size')
const orderRouter = require('./order')
const isAuth = require('../middlewares/isAuth')
const isAuthAdmin = require('../middlewares/isAuthAdmin')

const route = app =>{
    app.use('/home', homeRouter);
    app.use('/product', productRouter);
    app.use('/categories', categoryRouter);
    app.use('/statuses', statusRouter);
    app.use('/auth', authRouter);
    app.use('/order', orderRouter);
    app.use('/love', isAuth, loveRouter);
    app.use('/cart', isAuth, cartRouter);
    app.use('/account', isAuth, accountRouter);
    app.use('/accountadmin', isAuthAdmin, accountAdminRouter);
    app.use('/address', isAuth, addressRouter);
    app.use('/history', isAuth, historyRouter);
    app.use('/purchase', isAuth, purchaseRouter);
    app.use('/size', sizeRouter);
}

module.exports = route;