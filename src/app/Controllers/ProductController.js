const Product = require("../Models/Product");

const getObjectCondition = ({ gender, cat, status }) => {
  let condition = {};
  if (gender && gender !== 'null') condition["gender"] = gender;
  if (cat && cat !== 'null') condition["category"] = cat;
  if (status && status !== 'null') condition["statuses"] = status;
  return condition;
};

class ProductControler {
  async getAll(req, res, next) {
    const condition = getObjectCondition(req.query);
    try {
      const products = await Product.find(condition).populate(
        "statuses colors images category"
      );
      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
  async getProductById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id).populate(
        "statuses colors category sizes images"
      );
      return res.status(200).json({
        success: true,
        product,
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
