const Purchase = require("../Models/Purchase");

const populateArr = [
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
];
class PurchaseController {
  async getAll(req, res) {
    const orders = await Purchase.find().populate(populateArr);
    return res.status(200).json({
      success: true,
      orders,
    });
  }
  async getOrderById(req, res) {
    const { id } = req.params;
    const order = await Purchase.findById(id).populate(populateArr);
    return res.status(200).json({
      success: true,
      order,
    });
  }
}

module.exports = new PurchaseController();
