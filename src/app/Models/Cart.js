const Product = require("./Product");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    account: { type: String },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          // populate: { select: "_id price" },
        }, //=> price
        quantity: { type: Number },
        size: { type: String },
        total: { type: Number },
      },
    ],
    totalPrice: {
      type: Number,
    },
    totalQuantity: {
      type: Number,
    },
  },
  {
    timestamps: true.valueOf,
  }
);
Cart.pre("save", async function (next) {
  await Promise.all(
    this.products?.map(async (item) => {
      let prd = await Product.findById(item.product);
      item.total = prd.price * item.quantity;
      return item.total;
    })
  );

  this.totalQuantity = this.products.reduce(
    (result, prd) => result + prd.quantity,
    0
  );

  this.totalPrice = this.products.reduce(
    (result, product) => result + product.total,
    0
  );

  next();
});

module.exports = mongoose.model("Cart", Cart, "carts");
