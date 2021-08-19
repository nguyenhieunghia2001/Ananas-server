const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Status", Status, 'statuses');
