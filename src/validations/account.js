const { check } = require("express-validator");
const Account = require("../app/Models/Account");
const { checkPassword } = require("../utils/hashPass");

let validateRegisterUser = [
  check("email")
    .notEmpty()
    .withMessage("Email không được trống!")
    .isEmail()
    .withMessage("Email không đúng định dạng!")
    .custom((value) => {
      return Account.findOne({ email: value })
        .then((user) => {
          if (user) {
            throw new Error("Email đã được đăng ký!");
          }
        })
        .catch((e) => {
          throw new Error("Có lỗi xảy ra, vui lòng thử lại!");
        });
    }),
  check("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Mật khẩu phải từ 8 - 16 kí tự!"),
];
let validateLoginUser = [
  check("email")
    .notEmpty()
    .withMessage("Email không được trống!")
    .isEmail()
    .withMessage("Email không đúng định dạng!")
    .custom((value) => {
      return Account.findOne({ email: value }).then((user) => {
        if (!user) {
          throw new Error("Email chưa được đăng ký!");
        }
      });
    }),
  check("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Mật khẩu phải từ 8 - 16 kí tự!")
    .custom((value, { req }) => {
      return Account.findOne({ email: req.body?.email }).then(async (user) => {
        const checkPass = await checkPassword(value, user.password);
        if (!checkPass) {
          throw new Error("Mật khẩu không đúng!");
        }
      });
    }),
];
let validateEditAccountByAdmin = [
  check("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Mật khẩu phải từ 8 - 16 kí tự!"),
];
module.exports = {
  validateRegisterUser,
  validateLoginUser,
  validateEditAccountByAdmin
};

