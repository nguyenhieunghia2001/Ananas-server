const Account = require("../Models/Account");
const { verifyToken } = require("../../service/JsonWebToken");
const { uploadImage } = require("../../service/cloudDinary");

class AccountControler {
  async getAccountByEmail(req, res, next) {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    const account = await Account.findOne({ email: decoded.email });
    return res.status(200).json({
      success: true,
      account,
    });
  }
  async UpdateInfoAccount(req, res) {
    const {avatar} = req.files;
    // console.log(avatar[0].path);
    // console.log(req.files);
    const t = await uploadImage(avatar[0].path, 'account');
    // console.log(t);
    res.status(200).json({ });
  }
}

module.exports = new AccountControler();
