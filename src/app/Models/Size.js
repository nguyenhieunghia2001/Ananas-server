const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Size = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Size", Size, 'sizes');
