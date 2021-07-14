const Product = require("../Models/Product");
const Account = require("../Models/Account");
const { checkPassword, hashPassword } = require("../../utils/hashPass");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
class AuthControler {
  async login(req, res, next) {
    const { email, password } = req.body;
    console.log(req.body);
    return res.json({});
  }

  async register(req, res, next) {
    const { email, password } = req.body;
    // const email = 'nghiadx@gmai';
    // const password = '1234';

    const passHash = await hashPassword(password);
    // console.log(passHash);
    await Account.create({
      email,
      password: passHash,
    })

    return res.status(200).json({ email: email });
  }
}

module.exports = new AuthControler();
