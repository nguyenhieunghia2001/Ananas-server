const Account = require("../Models/Account");
const { verifyToken } = require("../../service/JsonWebToken");
const { uploadImage } = require("../../service/cloudDinary");
const { checkPassword, hashPassword } = require("../../utils/hashPass");

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
    const { avatar } = req.files;
    const { phone, username } = req.body;
    console.log(username, phone);
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);
    // console.log(req.files);
    Account.findOne({ email: decoded.email })
      .then((account) => {
        account.username = username;
        account.phone = phone;

        account.save();
      })
      .catch(() => res.status(400).json({}));

    res.status(200).json({});
  }
  async updatePassword(req, res) {
    const { oldPass, newPass } = req.body;
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);

    Account.findOne({ email: decoded.email }).then(async (account) => {
      if (checkPassword(oldPass, account.password)) {
        // console.log(account);
        const passhash = await hashPassword(newPass);
        account.password = passhash;
        // account.save();
      }
    });
    res.status(200).json({});
  }
}

module.exports = new AccountControler();
