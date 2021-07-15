const Account = require("../Models/Account");
const { hashPassword } = require("../../utils/hashPass");
const { signAndCreateToken } = require("../../service/JsonWebToken");
class AuthControler {
  async login(req, res, next) {
    const { email } = req.body;
    // console.log(req.body);
    const token = await signAndCreateToken({ email });

    // nếu thành công thì sẽ trả về cho user một token, đồng thời server sẽ set một cookie ở browser của client.
    // Và cookie này ở user sẽ không bao giờ đọc được bởi javascript.  Nó sẽ được browser tự động gửi đi khi có yêu cầu.
    res.cookie("access_token", token, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true, // chỉ có http mới đọc được token
      // secure: true; //ssl nếu có, nếu chạy localhost thì comment nó lại
    });

    const account = await Account.findOne({ email });
    return res.status(200).json({
      success: true,
      msg: "OKE",
      username: account?.username,
    });
  }

  async register(req, res, next) {
    const { email, password, username } = req.body;

    const passHash = await hashPassword(password);
    await Account.create({
      email,
      password: passHash,
      username,
    });

    return res.status(200).json({
      success: true,
      msg: "OKE",
    });
  }
}

module.exports = new AuthControler();
