const Category = require("../Models/Category");

class ProductControler {
  async getAll(req, res, next) {
    try {
      const categories = await Category.find({});
      return res.status(200).json({
        success: true,
        categories,
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
