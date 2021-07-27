const Account = require("../Models/Account");
const { verifyToken } = require("../../service/JsonWebToken");
const { uploadImage, destroySingle } = require("../../service/cloudDinary");
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
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);
    const account = await Account.findOne({ email: decoded.email });

    if (avatar) {
      if (account.public_Id) {
        const destroyImage = await destroySingle(account.public_Id);
      }
      const { publicId } = await uploadImage(
        avatar[0].path,
        "ananas/account"
      );
      account.public_Id = publicId;
    }
    account.username = username;
    account.phone = phone;
    account.save();

    res.status(200).json({
      username: account?.username,
      public_Id: account?.public_Id
    });
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
        account.save();
      }
    });
    res.status(200).json({});
  }
}

module.exports = new AccountControler();
