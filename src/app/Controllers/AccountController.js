const Account = require("../Models/Account");
const { verifyToken } = require("../../service/JsonWebToken");

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
}

module.exports = new AccountControler();
