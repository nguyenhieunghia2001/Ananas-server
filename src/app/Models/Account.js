const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    email: { type: String },
    password: { type: String },
    username: { type: String },
    phone: { type: String },
    address: { type: String },
    role: { type: String, default: "user" },
    status: {type: Boolean, default: false},
    verify: { type: String },
    love: [{
      product: { type: Schema.Types.ObjectId, ref: "products" },
      createAt: {type: Date, default: Date.now}
    }],
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Account", Account, "accounts");
