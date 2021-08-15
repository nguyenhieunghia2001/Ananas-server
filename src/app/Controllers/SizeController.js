const Size = require("../Models/Size");

class SizeControler {
  async getAll(req, res, next) {
    try {
      const sizes = await Size.find({});
      return res.status(200).json({
        success: true,
        sizes,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
}

module.exports = new SizeControler();
