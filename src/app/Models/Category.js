const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Category", Category, 'categories');
