const { check } = require("express-validator");
const Account = require("../app/Models/Account");
const { checkPassword } = require("../utils/hashPass");

let validateLoginUser = [
  check("oldPass")
    // .isEmpty()
    // .withMessage("Không được bỏ trống")
    .isLength({ min: 8, max: 16 })
    .withMessage("Mật khẩu phải từ 8 - 16 kí tự!")
    .custom(async (value) => {
      return await Account.findOne({
        email: "nghiadx2001@gmail.com",
      }).then(async (account) => {
        const checkPass = await checkPassword(value, account.password);
        if (!checkPass) {
          throw new Error("Mật khẩu cũ không đúng");
        }
      });
    }),
  check("newPass")
    // .isEmpty()
    // .withMessage("Không được bỏ trống")
    .isLength({ min: 8, max: 16 })
    .withMessage("Mật khẩu phải từ 8 - 16 kí tự!"),
  check("confirmPass")
    // .isEmpty()
    // .withMessage("Không được bỏ trống")
    .isLength({ min: 8, max: 16 })
    .withMessage("Mật khẩu phải từ 8 - 16 kí tự!")
    .custom((value, { req }) => {
      if (req.body?.newPass && value !== req.body?.newPass)
        throw new Error("Nhập lại mật khẩu không đúng");
      // Indicates the success of this synchronous custom validator
      return true;
    }),
];

module.exports = {
  validateLoginUser,
};
