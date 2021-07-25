const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const accountController = require("../app/Controllers/AccountController");

router.get("/getinfo", accountController.getAccountByEmail);
router.post(
  "/updateinfo",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  accountController.UpdateInfoAccount
);

module.exports = router;
