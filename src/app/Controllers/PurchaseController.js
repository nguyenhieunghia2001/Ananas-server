const Purchase = require("../Models/Purchase");
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");
const { verifyToken } = require("../../service/JsonWebToken");
const moment = require("moment-timezone");


class PurchaseController {
  async getAll(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const purchases = await Purchase.find({ email: decoded.email }).populate([
      {
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
      },
      {
        path: "address",
      },
    ]);
    return res.status(200).json({
      success: true,
      purchases,
    });
  }
  async getPurchaseById(req, res) {
    const { id } = req.params;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const purchase = await Purchase.findOne({
      _id: id,
      email: decoded.email,
    }).populate([
      {
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
      },
      {
        path: "address",
      },
    ]);
    return res.status(200).json({
      success: true,
      purchase,
    });
  }
  async addPurchase(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);
    const { addressId, cartId } = req.body;

    const cart = await Cart.findOne({ account: decoded.email });
    //giảm số lượng sp có trong giỏ
    cart?.products?.map(async (item) => {
      const product = await Product.findById(item?.product?._id).populate({
        path: "sizes",
        populate: "size",
      });
      const index = product?.sizes.findIndex(
        (sz) => sz?.size?.name === item.size
      );
      product.sizes[index].quantity =
        +product.sizes[index].quantity - +item.quantity;
      await product.save();
    });

    await Purchase.create({
      email: decoded.email,
      products: cart?.products,
      address: addressId,
      status: [
        {
          name: "0",
          time: moment().tz("Asia/Ho_Chi_Minh").format(),
        },
      ],
    });

    //xóa giỏ hàng
    await cart.remove();
    return res.status(200).json({
      success: true,
    });
  }
}

module.exports = new PurchaseController();
