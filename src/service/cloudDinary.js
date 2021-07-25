const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nguyenhieunghia",
  api_key: "228511477255843",
  api_secret: "P4MrHnkT2sHi9f_2-2OMozJ6U2E",
});

const uploadImage = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, {
        folder
      })
      .then((result) => {
        if (result) {
          const fs = require("fs");
          fs.unlinkSync(file);
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

module.exports = {
  // uploadImageAccount: (file) => {
  //   return uploadImage(file, "ananasAccount");
  // },
  uploadImage,
};
