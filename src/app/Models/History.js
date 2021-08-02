const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const History = new Schema(
  {
    email: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  }
);

module.exports = mongoose.model("History", History, "Histories");
