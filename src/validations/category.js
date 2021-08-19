const { check } = require("express-validator");
const Category = require("../app/Models/Category");
const { checkPassword } = require("../utils/hashPass");

let validateCategory = [
  check("name")
    .notEmpty()
    .withMessage("Vui lòng điền đầy đủ thông tin")
    .custom((value) => {
      return Category.aggregate([
        {
          $project: {
            name: { $toLower: "$name" },
          },
        },
        {
          $match: {
            name: value.toLowerCase(),
          },
        },
      ]).then(async (cat) => {
        if (cat.length) {
          throw new Error("Tên danh mục đã tồn tại");
        }
      });
    }),
];
module.exports = {
  validateCategory,
};
