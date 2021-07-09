const Product = require('../Models/Product')
const Category = require('../Models/Category')

class HomeControler{
    async index(req, res, next){
        const products = await Product.find({});
        const categories = await Category.find({});
        return res.json({products, categories})
    }
}

module.exports = new HomeControler;