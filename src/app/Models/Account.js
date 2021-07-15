const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    email: {type: String},
    password: {type: String},
    username: {type: String},
    phone: {type: String},
    address: {type: String},
    role: {type: String, default: 'user'},
    verify: {type: String},
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Account", Account, 'accounts');
