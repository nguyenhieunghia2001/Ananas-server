const { verifyToken } = require("../service/JsonWebToken");

const isAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log("cookie>>>", token);
  try {
    const decoded = verifyToken(token);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(400);
    throw err;
  }
};

module.exports = isAuth;
