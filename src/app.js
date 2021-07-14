require("dotenv").config();
const express = require("express");
const cors = require("cors");
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

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
