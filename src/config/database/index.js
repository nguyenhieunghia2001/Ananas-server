const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("kết nối Thành công");
  }catch(error){
    console.log('connect fail');
  }
}

module.exports = { connect };