const Cart = require("../Models/Cart");
const Account = require("../Models/Account");
const { verifyToken } = require("../../service/JsonWebToken");

class CartControler {
  async getAllProductCart(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const cart = await Cart.findOne({ account: decoded.email }).populate({
      path: "products.product",
      populate: [
        {
          path: "images",
        },
        {
          path: "sizes",
          populate: "size",
        },
      ],
    });
    return res.status(200).json({
      success: true,
      cart,
    });
  }
  async addProductToCart(req, res) {
    const { id } = req.params;
    const { size, quantity } = req.query;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const cart = await Cart.findOne({ account: decoded.email });
    if (cart) {
      //ktr prd tồn tại chưa
      const checkProduct = cart.products.find(
        (ct) => ct.product == id && ct.size == size
      );
      if (checkProduct) {
        const index = cart.products.map((ct) => ct.product).indexOf(id);

        if (index > -1) {
          cart.products[index].quantity = checkProduct.quantity + +quantity;
        }
      } else {
        cart.products.push({
          product: id,
          quantity: +quantity,
          size,
        });
      }
      await cart.save();
    } else {
      await Cart.create({
        account: decoded.email,
        products: [
          {
            product: id,
            quantity: +quantity,
            size,
          },
        ],
      });
    }
    return res.status(200).json({
      success: true,
    });
  }
  async removeProductToCart(req, res) {
    const { id } = req.params;
    const { size } = req.query;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    Cart.findOne({ account: decoded.email }).then((cart) => {
      const prd = cart.products.find(
        (ct) => ct.product == id && ct.size === size
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
  async updateSizeQuantity(req, res) {
    const { id } = req.params;
    const { size, quantity } = req.query;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    Cart.findOne({ account: decoded.email }).then(async (cart) => {
      const index = cart.products.findIndex((ct) => ct.product == id && ct.size == size);
      
      if (index > -1) {
        cart.products[index].quantity = +quantity;
      }
      await cart.save();
    });

    return res.status(200).json({
      success: true,
    });
  }
}

module.exports = new CartControler();
