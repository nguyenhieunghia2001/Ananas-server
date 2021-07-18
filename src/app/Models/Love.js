const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Love = new Schema(
  {
    email: {type: String},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Love", Love, 'loves');