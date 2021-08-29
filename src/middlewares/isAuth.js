const Account = require("../app/Models/Account");
const { verifyToken } = require("../service/JsonWebToken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    console.log(token);
    const decoded = await verifyToken(token);
    const account = await Account.findOne({ email: decoded.email });
    if (!token || !account) {
      return res.status(422).json({
        success: false,
        msg: "auth",
      });
    }
    next();
  } catch (err) {
    return res.status(422).json({
      success: false,
      msg: "auth",
    });
  }
};

module.exports = isAuth;
