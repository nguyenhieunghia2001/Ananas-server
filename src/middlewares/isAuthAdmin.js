const Account = require("../app/Models/Account");
const { verifyToken } = require("../service/JsonWebToken");

const isAuthAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token_admin;
    const decoded = await verifyToken(token);

    const account = await Account.findOne({ email: decoded.email });

    if (!token || !account || account.role !== "admin") {
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

module.exports = isAuthAdmin;
