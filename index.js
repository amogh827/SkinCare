const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoKey = require(__dirname + "/mongokey.js")

mongoose.connect(
  mongoKey.getKey(),
  {
    useNewUrlParser: true,
  }
);

const productSchema = mongoose.Schema({
  Product_Type: String,
  Brand: String,
  Name: String,
  Price: Number,
  Skin_Type: String,
});

const Product = mongoose.model("skin", productSchema);

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running at port 3000");
});

app.get("/", (req, res) => {
  // console.log("hello");
  let prod = [];
  Product.find({}, (err, foundProducts) => {
    if (!err) prod = foundProducts;
    else {
      console.log(err);
    }
    res.render("home", {
      products: prod,
    });
  });
  // res.render("home");
});
