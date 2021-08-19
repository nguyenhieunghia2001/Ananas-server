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
  async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const status = await Status.findById(id);
      return res.status(200).json({
        success: true,
        status,
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
      const status = await Status.create({
        name,
      });
      return res.status(200).json({
        success: true,
        status,
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
      const status = await Status.findById(id);
      if (status) {
        status.name = name;
        status.save();
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

module.exports = new ProductControler();
