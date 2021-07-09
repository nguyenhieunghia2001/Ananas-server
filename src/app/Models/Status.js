const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String },
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Status", Status, 'statuses');
