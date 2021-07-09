require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const bodyParser = require("body-parser");
const route = require("./router/index");
const db = require("./config/database/index");

//connect db
db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
