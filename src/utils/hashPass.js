const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const checkPassword = async (password, passwordHash) => {
  const check = await bcrypt.compare(password, passwordHash);
  return check;
};

module.exports = {
  hashPassword,
  checkPassword,
};
