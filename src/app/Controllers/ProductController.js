const Product = require("../Models/Product");

const getObjectCondition = ({ gender, cat, status }) => {
  let condition = {};
  if (gender && gender !== "null") condition["gender"] = gender;
  if (cat && cat !== "null") condition["category"] = cat;
  if (status && status !== "null") condition["statuses"] = status;
  return condition;
};

class ProductControler {
  async getAll(req, res, next) {
    const condition = getObjectCondition(req.query);
    try {
      const products = await Product.find(condition).populate([
        {
          path: "statuses",
        },
        {
          path: "colors",
        },
        {
          path: "images",
        },
        {
          path: "category",
        },
        {
          path: "sizes",
          populate: "size",
        },
      ]);
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
      const product = await Product.findById(id).populate([
        {
          path: "statuses",
        },
        {
          path: "colors",
        },
        {
          path: "images",
        },
        {
          path: "category",
        },
        {
          path: "sizes",
          populate: "size",
        },
      ]);
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
  async createProduct(req, res) {
    const { images } = req.files;
    const { name, price, category, detail, gender, sizes } = req.body;

    await Product.create({
      name,
      price,
      des: detail,
      category,
      status,
      sizes,
      gender,
    });

    res.status(200).json("oke");
  }
}

module.exports = new ProductControler();
