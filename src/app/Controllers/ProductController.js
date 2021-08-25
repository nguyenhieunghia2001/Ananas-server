const { uploadImage, destroySingle } = require("../../service/cloudDinary");
const Product = require("../Models/Product");
const Image = require("../Models/Image");

const getObjectCondition = ({ gender, cat, status }) => {
  let condition = {};
  if (gender && gender !== "null") condition["gender"] = gender;
  if (cat && cat !== "null") condition["category"] = cat;
  if (status && status !== "null") condition["statuses"] = status;
  return condition;
};
const populateProduct = [
  {
    path: "status",
  },
  {
    path: "colors",
  },
  {
    path: "images",
  },
  {
    path: "category",
  },
  {
    path: "sizes",
    populate: "size",
  },
];
class ProductControler {
  async getAll(req, res, next) {
    const condition = getObjectCondition(req.query);
    try {
      const products = await Product.find(condition).populate(populateProduct);
      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
  async getAllSelling(req, res) {
    try {
      const products = await Product.find()
        .sort({ sold: -1 }).limit(8)
        .populate(populateProduct);
      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
  async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id).populate(populateProduct);
      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error,
      });
    }
  }
  async createProduct(req, res) {
    const { images } = req.files;
    const { name, price, category, detail, gender, sizes, status } = req.body;

    let res_promises = images?.map(
      (file) =>
        new Promise((resolve, reject) => {
          uploadImage(file.path, "ananas/products").then((result) => {
            resolve(result);
          });
        })
    );
    let idImages;
    if (res_promises)
      await Promise.all(res_promises)
        .then(async (arrImg) => {
          const imagesNew = arrImg?.map(async (item) => {
            const image = await Image.create({
              urlPublic: item.url,
            });
            return image?._id;
          });
          await Promise.all(imagesNew).then(async (items) => {
            idImages = items;
          });
        })
        .catch((error) => {
          console.error("> Error>", error);
        });
    // CREATE PRODUCT
    await Product.create({
      name,
      price: +price,
      des: detail,
      category,
      status,
      sizes: sizes ? JSON.parse(sizes) : [],
      images: idImages || [],
      gender,
    });

    res.status(200).json("oke");
  }
  async editProduct(req, res) {
    const CLOUNDIANRY_CONTEXT =
      "https://res.cloudinary.com/nguyenhieunghia/image/upload/v1627378637/";
    const { images } = req.files;
    const { id } = req.params;
    const {
      name,
      price,
      category,
      detail,
      gender,
      sizes,
      status,
      imagesRemove,
    } = req.body;

    const product = await Product.findById(id);
    if (product) {
      let imagesAfter = product?.images;
      //xóa hình
      JSON.parse(imagesRemove).removeFiles?.forEach(async (item) => {
        // console.log(item, imagesAfter);
        const part = item?.url.split(CLOUNDIANRY_CONTEXT);
        //xóa trên clound
        await destroySingle(part[1]);
        //xóa trong collection Image mongooes
        await Image.deleteOne({ urlPublic: part[1] });
        // xóa trong collection product - field images mongooes
        const index = imagesAfter.findIndex((e) => e == item._id);
        imagesAfter = [
          ...imagesAfter.slice(0, index),
          imagesAfter.slice(index + 1, imagesAfter.length),
        ];
      });
      // console.log(imagesAfter);
      let res_promises = images?.map(
        (file) =>
          new Promise((resolve, reject) => {
            uploadImage(file.path, "ananas/account").then((result) => {
              resolve(result);
            });
          })
      );
      let idImages = [];
      if (res_promises)
        await Promise.all(res_promises)
          .then(async (arrImg) => {
            const imagesNew = arrImg?.map(async (item) => {
              const image = await Image.create({
                urlPublic: item.publicId,
              });
              console.log(image?._id);
              return image?._id;
            });
            await Promise.all(imagesNew).then(async (items) => {
              idImages = items;
            });
          })
          .catch((error) => {
            console.error("> Error>", error);
          });

      // UPDATE PRODUCT
      product.name = name;
      product.price = +price;
      product.des = detail;
      product.category = category;
      product.status = status;
      product.sizes = JSON.parse(sizes);
      product.images = [...imagesAfter, ...idImages];
      product.gender = gender;

      await product.save();
    }

    res.status(200).json("oke");
  }
}

module.exports = new ProductControler();
