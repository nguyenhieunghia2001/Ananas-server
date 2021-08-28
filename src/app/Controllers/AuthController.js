const Account = require("../Models/Account");
const { hashPassword } = require("../../utils/hashPass");
const { signAndCreateToken } = require("../../service/JsonWebToken");
const { verifyToken } = require("../../service/JsonWebToken");

class AuthControler {
  async login(req, res) {
    const { email } = req.body;
    const account = await Account.findOne({ email });
    const token = await signAndCreateToken({ email });
    // nếu thành công thì sẽ trả về cho user một token, đồng thời server sẽ set một cookie ở browser của client.
    // Và cookie này ở user sẽ không bao giờ đọc được bởi javascript.  Nó sẽ được browser tự động gửi đi khi có yêu cầu.
    res.cookie("access_token", token, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true, // chỉ có http mới đọc được token
      secure: process.env.COOKIE_SECURE, //ssl nếu có, nếu chạy localhost thì comment nó lại
      // sameSite: 'none',
    });
    return res.status(200).json({
      success: true,
      msg: "OKE",
      account,
    });
  }
  async loginAdmin(req, res) {
    const { email } = req.body;
    const account = await Account.findOne({ email });
    if (account && account?.role === "admin") {
      const token = await signAndCreateToken({ email });
      // nếu thành công thì sẽ trả về cho user một token, đồng thời server sẽ set một cookie ở browser của client.
      // Và cookie này ở user sẽ không bao giờ đọc được bởi javascript.  Nó sẽ được browser tự động gửi đi khi có yêu cầu.
      res.cookie("access_token_admin", token, {
        maxAge: 365 * 1 * 60 * 60 * 100,
        httpOnly: true, // chỉ có http mới đọc được token
        secure: process.env.COOKIE_SECURE, //ssl nếu có, nếu chạy localhost thì comment nó lại
      });
      return res.status(200).json({
        success: true,
        msg: "OKE",
        account,
      });
    } else {
      return res.status(401).json({
        success: false,
        msg: "fail",
      });
    }
  }

  async register(req, res) {
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
  async logout(req, res) {
    // const token = req.cookies.access_token;
    res.cookie("access_token", {}, {
      maxAge: 0,
      httpOnly: true, // chỉ có http mới đọc được token
      secure: process.env.COOKIE_SECURE, //ssl nếu có, nếu chạy localhost thì comment nó lại
      // sameSite: 'none',
    });
    return res.clearCookie("access_token").status(200).json({
      success: true,
    });
  }
}

module.exports = new AuthControler();
