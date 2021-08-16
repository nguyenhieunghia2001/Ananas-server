const { uploadImage } = require("../../service/cloudDinary");
const Product = require("../Models/Product");
const Image = require("../Models/Image");

const getObjectCondition = ({ gender, cat, status }) => {
  let condition = {};
  if (gender && gender !== "null") condition["gender"] = gender;
  if (cat && cat !== "null") condition["category"] = cat;
  if (status && status !== "null") condition["statuses"] = status;
  return condition;
};

class ProductControler {
  async getAll(req, res, next) {
    const condition = getObjectCondition(req.query);
    try {
      const products = await Product.find(condition).populate([
        {
          path: "statuses",
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
      ]);
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
  async getProductById(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id).populate([
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
      ]);
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
          uploadImage(file.path, "ananas/account").then((result) => {
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
    const { images } = req.files;
    const { id, name, price, category, detail, gender, sizes, status } =
      req.body;

    const product = await Product.findById(id);
    if (product) {
      let res_promises = images?.map(
        (file) =>
          new Promise((resolve, reject) => {
            uploadImage(file.path, "ananas/account").then((result) => {
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

      // UPDATE PRODUCT
      product.name = name;
      product.price = +price;
      product.des = detail;
      product.category = category;
      product.status = status;
      product.sizes;
      product.images;
      product.gender = gender;

      await product.save()
    }

    res.status(200).json("oke");
  }
}

module.exports = new ProductControler();
