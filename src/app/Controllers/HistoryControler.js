const History = require("../Models/History");
const { verifyToken } = require("../../service/JsonWebToken");
const { decode } = require("punycode");

class HistoryControler {
  async getProductsByEmail(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const history = await History.findOne({ email: decoded.email }).populate({
      path: "products",
      populate: {
        path: "images",
      },
    });

    return res.status(200).json({
      success: true,
      history,
    });
  }
  async addHistory(req, res) {
    const { productId } = req.query;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const history = await History.findOne({
      email: decoded.email,
    });
    if (history) {
      const checkPrd = history?.products?.some(item => item == productId);
      if (!checkPrd) {
        history.products.push(productId);
        history.save();
      }
    } else {
      await History.create({
        email: decoded.email,
        products: [productId],
      });
    }

    return res.status(200).json({
      success: true,
    });
  }
}

module.exports = new HistoryControler();
