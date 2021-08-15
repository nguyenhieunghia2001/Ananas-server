const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    urlPublic: { type: String },
  },
  {
    timestamps: true.valueOf,
  }
);

module.exports = mongoose.model("Image", Image, 'images');
