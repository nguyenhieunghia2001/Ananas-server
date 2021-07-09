const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Seen = new Schema(
  {
    _id: Schema.Types.ObjectId,
    account: {type: Schema.Types.ObjectId, ref: 'Account'},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Seen", Seen, 'seens');