const Category = require("../Models/Category");

class ProductControler {
  async getAll(req, res) {
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
  async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);
      return res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
  async add(req, res) {
    const { name } = req.body;
    try {
      const category  = await Category.create({
        name,
      });
      return res.status(200).json({
        success: true,
        category
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
  async edit(req, res) {
    const { id, name } = req.body;
    try {
      const category = await Category.findById(id);
      category.name = name;
      category.save();
      return res.status(200).json({
        success: true,
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
