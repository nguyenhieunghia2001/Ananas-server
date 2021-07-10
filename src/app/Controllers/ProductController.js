const Product = require("../Models/Product");

class ProductControler {
  async getAll(req, res, next) {
    try {
      const products = await Product.find({}).populate(
        "statuses colors category sizes"
      );
      return res.status(200).json({
        success: true,
        products
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
}

module.exports = new ProductControler();
