const { check } = require("express-validator");
const Account = require("../app/Models/Account");

let validateRegisterUser = [
  check("email")
    .notEmpty()
    .withMessage("Email không được trống!")
    .isEmail()
    .withMessage("Email không đúng định dạng!")
    .custom((value) => {
      return Account.findOne({ email: value }).then((user) => {
        if (user) {
          throw new Error("Email đã được đăng ký!");
        }
      })
      .catch((e) => {throw new Error("Có lỗi xảy ra, vui lòng thử lại!")});
    }),
  check("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Mật khẩu phải từ 8 - 16 kí tự!"),
];

module.exports = {
  validateRegisterUser,
};
