const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorProductGroup = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {type: String},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("ColorProductGroup", ColorProductGroup, 'colorProductGroups');