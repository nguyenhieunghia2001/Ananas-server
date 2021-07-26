const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400);
    }
    next();
  } catch (err) {
    return res.status(400);
  }
};

module.exports = isAuth;
