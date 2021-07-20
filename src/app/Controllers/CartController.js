const Cart = require("../Models/Cart");
const Account = require("../Models/Account");
const { verifyToken } = require("../../service/JsonWebToken");

class CartControler {
  async getAllProductCart(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const cart = await Cart.findOne({ account: decoded.email }).populate({
      path: "products.product",
      populate: 'images'
    });
    return res.status(200).json({
      success: true,
      cart,
    });
  }
  async addProductToCart(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const cart = await Cart.findOne({ account: decoded.email });
    if (cart) {
      cart.products.push({
        product: "60e907c6c2c47422fcd2c7ac",
        quantity: 4,
        size: "44",
      });
      cart.save();
    } else {
      await Cart.create({
        account: decoded.email,
        products: [
          {
            product: "60e81d5ab47d38cf49cbd8a3",
            quantity: 2,
            size: "37",
          },
        ],
      });
    }
    return res.status(200).json({
      success: true,
    });
  }
  async removeProductToCart(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    Cart.findOne({ account: decoded.email }).then((cart) => {
      const prd = cart.products.find(
        (ct) => ct.product == "60e907c6c2c47422fcd2c7ac"
      );
      if (prd) {
        cart.products.pull(prd._id);
        cart.save();
      }
    });
    return res.status(200).json({
      success: true,
    });
  }
}

module.exports = new CartControler();
