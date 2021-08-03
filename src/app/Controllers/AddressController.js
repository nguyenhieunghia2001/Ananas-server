const Address = require("../Models/Address");
const { verifyToken } = require("../../service/JsonWebToken");

class AddressControler {
  async getAll(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const addresses = await Address.find({ email: decoded.email });

    return res.status(200).json({
      success: true,
      addresses,
    });
  }
  async getAddressDefault(req, res) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const addressDefault = await Address.findOne({ email: decoded.email, active: true });

    return res.status(200).json({
      success: true,
      addressDefault,
    });
  }
  async addAddress(req, res) {
    const { province, district, ward, detail, username, phone } = req.body;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const checkExists = await Address.findOne({ email: decoded.email });
    const address = await Address.create({
      email: decoded.email,
      province,
      district,
      ward,
      detail,
      username,
      phone,
      active: checkExists ? false : true,
    });
    return res.status(200).json({
      success: true,
      address,
    });
  }
  async updateAddress(req, res) {
    const { id, province, district, ward, detail, username, phone } = req.body;

    const address = await Address.findById(id);
    address.province = province;
    address.district = district;
    address.ward = ward;
    address.detail = detail;
    address.username = username;
    address.phone = phone;

    await address.save();

    return res.status(200).json({
      success: true,
      address,
    });
  }
  async removeAddress(req, res) {
    const { id } = req.params;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const address = await Address.findById(id);
    await address.remove();
    return res.status(200).json({
      success: true,
    });
  }
  async changeActive(req, res) {
    const { id } = req.params;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const addressActiveTrue = await Address.findOne({
      email: decoded.email,
      active: true,
    });
    if (addressActiveTrue) {
      addressActiveTrue.active = false;
      await addressActiveTrue.save();
    }

    const addressUpdateActive = await Address.findById(id);
    addressUpdateActive.active = true;
    await addressUpdateActive.save();

    return res.status(200).json({
      success: true,
    });
  }
}

module.exports = new AddressControler();
