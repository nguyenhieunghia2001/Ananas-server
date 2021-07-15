require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 8888;
const route = require("./router/index");
const db = require("./config/database/index");
const bodyParser = require('body-parser')

//connect db
db.connect();

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsConfig));

//body parser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser()) //cookie-parser dùng để đọc cookies của request:

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
