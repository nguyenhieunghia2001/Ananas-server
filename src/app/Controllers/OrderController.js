const Purchase = require("../Models/Purchase");
const Cart = require("../Models/Cart");
const Address = require("../Models/Address");
const Product = require("../Models/Product");
const { verifyToken } = require("../../service/JsonWebToken");

class PurchaseController {
  async getAll(req, res) {
    const orders = await Purchase.find().populate([
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
      orders,
    });
  }
}

module.exports = new PurchaseController();
