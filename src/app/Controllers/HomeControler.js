const Product = require("../Models/Product");
const Category = require("../Models/Category");
const Account = require("../Models/Account");
const Cart = require("../Models/Cart");
const Color = require("../Models/Color");
const ColorProductGroup = require("../Models/ColorProductGroup");
const Image = require("../Models/Image");
const Love = require("../Models/Love");
const Seen = require("../Models/Seen");
const Size = require("../Models/Size");
const Status = require("../Models/Status");

class HomeControler {
  async index(req, res, next) {
    const products = await Product.find({}).populate('statuses colors category sizes');
    // const _Account = await Account.find({});
    // const _Cart = await Cart.find({});
    // const _Color = await Color.find({});
    // const _ColorProductGroup = await ColorProductGroup.find({});
    // const _Image = await Image.find({});
    // const _Love = await Love.find({});
    // const _Seen = await Seen.find({});
    // const _Size = await Size.find({});
    // const _Status = await Status.find({});

    return res.json({ products });
  }
}

module.exports = new HomeControler();
