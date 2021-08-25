const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    verifyToken(token);
    if (!token) {
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
