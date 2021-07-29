const Address = require("../Models/Address");

class AddressControler {
  async getAll(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const address = await Address.find({ email: decoded.email });

    return res.status(200).json({
      success: true,
      address,
    });
  }
  async addAddress(req, res) {
    const { province, district, ward, detail, username, phone } = req.body;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const address = await Address.findOne({ email: decoded.email });
    await Address.create({
      email: decoded.email,
      province,
      district,
      ward,
      detail,
      username,
      phone,
      active: address ? true : false,
    });

    return res.status(200).json({
      success: true,
    });
  }
}

module.exports = new AddressControler();
