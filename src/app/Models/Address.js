const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Address = new Schema(
  {
    email: { type: String },
    username: { type: String },
    phone: { type: String },
    province: {
      code: { type: String },
      name: { type: String },
    },
    district: {
      code: { type: String },
      name: { type: String },
    },
    ward: {
      code: { type: String },
      name: { type: String },
    },
    detail: { type: String },
    active: { type: Boolean },
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Address", Address, "addresses");
