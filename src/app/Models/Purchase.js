const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

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
    status: {
      name: { type: String, default: "0", enum: ["0", "1", "2", "3"] },
      time: {
        type: String,
        default: () => moment().tz("Asia/Ho_Chi_Minh").format(),
      },
    }, // 0: đặt hàng thành công, -1: Đơn hàng đã hủy, 1: đang giao, 2: giao thành công
  },
  {
    timestamps: {
      type: String,
      default: () => moment().tz("Asia/Ho_Chi_Minh").format(),
    },
  }
);

Purchase.pre("save", async function (next) {
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
