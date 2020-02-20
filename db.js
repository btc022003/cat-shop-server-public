const mongoose = require("mongoose");
const { Book, BookCategory } = require("./models");

mongoose
  .connect("mongodb://localhost:27017/cat-shop", {
    useNewUrlParser: true
  })
  .then(res => {
    // console.log(res);
    console.log("数据库连接成功");
  })
  .catch(err => {
    console.log(err);
  });
