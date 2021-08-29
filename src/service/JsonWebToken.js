const jwt = require("jsonwebtoken");

const signAndCreateToken = (payload) => {
  // Ký và tạo token
  const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "2h",
  });
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_TOKEN);
};

module.exports = {
  signAndCreateToken,
  verifyToken,
};
