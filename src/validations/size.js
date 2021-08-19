const { check } = require("express-validator");
const Size = require("../app/Models/Size");

let validateSize = [
  check("name")
    .notEmpty()
    .withMessage("Vui lòng điền đầy đủ thông tin")
    .custom((value) => {
      return Size.aggregate([
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
          throw new Error("Tên kích thước đã tồn tại");
        }
      });
    }),
];
module.exports = {
  validateSize,
};
