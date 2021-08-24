const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const productController = require("../app/Controllers/ProductController");

router.get("/all", productController.getAll);
router.get("/all/selling", productController.getAllSelling);
router.get("/detail/:id", productController.getProductById);

router.post(
  "/create",
  upload.fields([
    {
      name: "images",
      maxCount: 6,
    },
  ]),
  productController.createProduct
);
router.post(
  "/edit/:id",
  upload.fields([
    {
      name: "images",
      maxCount: 6,
    },
  ]),
  productController.editProduct
);

module.exports = router;
