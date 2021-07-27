const Account = require("../Models/Account");
const { hashPassword } = require("../../utils/hashPass");
const { signAndCreateToken } = require("../../service/JsonWebToken");
const { verifyToken } = require("../../service/JsonWebToken");

class AuthControler {
  async login(req, res) {
    const { email } = req.body;
    console.log(req.body);
    const account = await Account.findOne({ email });

    const token = await signAndCreateToken({ email });

    // nếu thành công thì sẽ trả về cho user một token, đồng thời server sẽ set một cookie ở browser của client.
    // Và cookie này ở user sẽ không bao giờ đọc được bởi javascript.  Nó sẽ được browser tự động gửi đi khi có yêu cầu.
    res.cookie("access_token", token, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true, // chỉ có http mới đọc được token
      // secure: true; //ssl nếu có, nếu chạy localhost thì comment nó lại
    });
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

  async getInfoUserCurrent(req, res) {
    const token = req.cookies.access_token;
    if (!token) res.status(400);
    try {
      const decoded = verifyToken(token);
      //lấy emai trong decoded - token
      const account = await Account.findOne({ email: decoded.email });
      return res.status(200).json({
        success: true,
        username: account?.username,
        public_Id: account?.public_Id,
      });
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }
}

module.exports = new AuthControler();
