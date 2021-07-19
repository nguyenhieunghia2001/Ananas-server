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

const mongoose = require('mongoose');

class HomeControler {
  async index(req, res, next) {
    // await Product.create({
    //   _id: new mongoose.Types.ObjectId(),
    //   name: 'BASAS BUMPER GUM NE - LOW TOP - BLACK/GUM',
    //   price: '520000',
    //   des: 'Đánh dấu một bước trưởng thành nữa, Basas Bumper Gum NE (New Episode) ra đời với những cải tiến nhẹ nhàng nhưng đủ tạo được sự thay đổi trong cảm nhận khi trải nghiệm. ',
    //   sizes: [
    //     {
    //       size: '60e827a0a4cc31369b497acb',
    //       quantity: 10,
    //     }
    //   ]
    // })

    return res.json({ msg: 'HOME API' });
  }
}

module.exports = new HomeControler();
