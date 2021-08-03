const Purchase = require("../Models/Purchase");

class PurchaseController {
  async getAll(req, res) {
    return res.status(200).json({
      success: true,
    });
  }
  async addPurchase(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    // await Purchase.create({
    //   email: decoded.email,
    //   products: [
    //     {
    //       product: id,
    //       quantity: +quantity,
    //       size,
    //     },
    //   ],
    // });
    return res.status(200).json({
      success: true,
    });
  }
}

module.exports = new PurchaseController();
