const jwt = require("jsonwebtoken");

const signAndCreateToken = (payload) => {
  // Ký và tạo token
  const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "2 days",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, process.env.SECRET_TOKEN);
    return verify;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signAndCreateToken,
  verifyToken,
};
