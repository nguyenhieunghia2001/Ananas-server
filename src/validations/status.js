const { check } = require("express-validator");
const Status = require("../app/Models/Status");

let validateStatus = [
  check("name")
    .notEmpty()
    .withMessage("Vui lòng điền đầy đủ thông tin")
    .custom((value) => {
      return Status.aggregate([
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
          throw new Error("Tên trạng thái đã tồn tại");
        }
      });
    }),
];
module.exports = {
  validateStatus,
};
