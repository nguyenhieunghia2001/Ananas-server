const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Purchase = new Schema(
  {
    email: { type: String },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
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
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    status: { type: String, default: "0" },
  },
  {
    timestamps: true.valueOf,
  }
);

Purchase.pre("save", async function (next) {
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

module.exports = mongoose.model("Purchase", Purchase, "purchase");
