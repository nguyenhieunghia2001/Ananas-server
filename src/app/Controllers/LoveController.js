const Love = require("../Models/Love");
const { verifyToken } = require("../../service/JsonWebToken");

class LoveControler {
  async getAllProductLove (req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const love = await Love.findOne({ email: decoded.email });
    return res.status(200).json({
      success: true,
      love
    })
  }
  async addProductLove(req, res, next) {
    const { productId } = req.query;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const love = await Love.findOne({ email: decoded.email });
    if (love) {
      love.products.push(productId);
      love.save();
    } else {
      await Love.create({
        email: decoded.email,
        products: [productId],
      });
    }

    return res.status(200).json({
      success: true,
    });
  }
  async deleteProductLove(req, res) {
    const { productId } = req.query;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const love = await Love.findOne({ email: decoded.email });
    if (love) {
      love.products.pull(productId);
      love.save();
    } 

    return res.status(200).json({
      success: true,
    });
  }
}

module.exports = new LoveControler();
