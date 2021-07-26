const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const checkPassword = async (password, passwordHash) => {
  return bcrypt
    .compare(password, passwordHash)
    .then((result) => {
      return result;
    })
    .catch(() => {
      return false;
    });
};

module.exports = {
  hashPassword,
  checkPassword,
};
