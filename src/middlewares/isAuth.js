const { verifyToken } = require("../service/JsonWebToken");

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = verifyToken(token);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(400);
    throw err;
  }
};

module.exports = isAuth;
