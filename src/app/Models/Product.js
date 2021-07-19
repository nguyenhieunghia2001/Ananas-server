const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, maxLength: 200 },
    price: { type: Number, default: 0 },
    des: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    statuses: { type: Schema.Types.ObjectId, ref: "Status" },
    sizes: [
      {
        size: { type: Schema.Types.ObjectId, ref: "Size" },
        quantity: { type: Number, default: 1 },
      },
    ],
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    colors: { type: Schema.Types.ObjectId, ref: "Color" },
    colorProductGroups: {
      type: Schema.Types.ObjectId,
      ref: "ColorProductGroup",
    },
    gender: { type: String, default: "ALL" },
    stock: {
      type: Number,
      default: function () {
        return this.sizes.reduce(
          (result, current) => result + current.quantity,
          0
        );
      },
    },
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Product", Product, "products");
