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
  async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const size = await Size.findById(id);
      return res.status(200).json({
        success: true,
        size,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
  async add(req, res) {
    const { name } = req.body;
    try {
      const size = await Size.create({
        name,
      });
      return res.status(200).json({
        success: true,
        size,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
  async edit(req, res) {
    const { id, name } = req.body;
    console.log(id);
    try {
      const size = await Size.findById(id);
      if (size) {
        size.name = name;
        size.save();
      }
      return res.status(200).json({
        success: true,
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
