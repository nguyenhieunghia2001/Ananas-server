const Status = require("../Models/Status");

class ProductControler {
  async getAll(req, res, next) {
    try {
      const statuses = await Status.find({});
      return res.status(200).json({
        success: true,
        statuses,
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
