const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    _id: Schema.Types.ObjectId,
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: {type: Number},
        size: {type: Schema.Types.ObjectId, ref: "Size"},
      },
    ],
    totalPrice: {type: Number}
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Cart", Cart, 'carts');
