const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, maxLength: 200 },
    price: { type: Number, default: 0 },
    des: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    status: { type: Schema.Types.ObjectId, ref: "Status" },
    sizes: [
      {
        size: { type: Schema.Types.ObjectId, ref: "Size" },
        quantity: { type: Number, default: 0 },
      },
    ],
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    colors: { type: Schema.Types.ObjectId, ref: "Color" },
    colorProductGroups: {
      type: Schema.Types.ObjectId,
      ref: "ColorProductGroup",
    },
    gender: { type: String, default: "ALL" },
    stock: { type: Number },
  },
  {
    timestamps: true.valueOf,
  }
);

Product.pre("save", async function (next) {
  this.stock = this.sizes.reduce((result, item) => +result + +item.quantity, 0);
});

module.exports = mongoose.model("Product", Product, "products");
