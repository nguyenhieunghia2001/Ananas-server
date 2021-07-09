const Product = require("../Models/Product");

class ProductControler {
  async getAll(req, res, next) {
    const products = await Product.find({}).populate('statuses colors category sizes');

    return res.json({ products });
  }
}

module.exports = new ProductControler();
