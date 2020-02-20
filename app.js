const express = require("express");
const path = require("path");
const ejs = require("ejs");
var logger = require("morgan");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtMiddle = require("express-jwt"); // 验证jwt数据
const cors = require("cors"); // 服务器端处理跨域

const { jwtSecret } = require("./utils/config");
const { Manager } = require("./models");

const app = express();

// 请求日志输出
app.use(logger("dev"));

app.set("view engine", "html");
// 使用ejs模版引擎
app.set("views", path.resolve(__dirname, "views"));
app.engine("html", ejs.renderFile);

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "10000kb"
  })
);
// parse application/json
app.use(
  bodyParser.json({
    limit: "10000kb"
  })
);
app.all("/api/*", cors());

app.get("/", (req, res) => {
  res.render("index", { t: "什么都没有！" });
});

app.get("/api/v3/get_data", (req, res) => {
  setTimeout(function() {
    res.send({
      code: 1
    });
  }, 10000);
});

app.use("/", express.static("./public"));

app.use("/api/v1/products", require("./api/v1/products"));
app.use("/api/v1/book_categories", require("./api/v1/book_categories"));
app.use("/api/v1/books", require("./api/v1/books"));
app.use("/api/v1/book_chapters", require("./api/v1/book_chapters"));
app.use("/api/v1/product_categories", require("./api/v1/product_categories"));
app.use("/api/v2/proxy", require("./api/v2/proxy"));
// 对api使用jwt权限验证
app.use(
  jwtMiddle({
    secret: jwtSecret
  }).unless({
    path: [new RegExp("/api/v1/auth/*"), new RegExp("/api/v1/common/*")]
  })
);
app.all("/api/v1/admin/*", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // 获取token
    const decoded = jwt.verify(token, jwtSecret);
    const { userId } = decoded;
    const user = await Manager.findById(userId);
    if (user) {
      next();
    } else {
      res.json({
        code: "error",
        message: "管理员账号不存在！"
      });
    }
  } catch (err) {
    res.json({
      code: "error",
      message: "管理员账号不存在！"
    });
  }
});
// app.use(jwt({
//   secret: jwtSecret
// }).unless({
//   path: [new RegExp('/api/v1/users/*'), new RegExp('/api/v1/common/*')],
// }));
app.use("/api/v1/common", require("./api/v1/common"));
app.use("/api/v1/admin/products", require("./api/v1/admin/products"));
app.use("/api/v1/admin/users", require("./api/v1/admin/users"));
app.use(
  "/api/v1/admin/product_categories",
  require("./api/v1/admin/product_categories")
);
app.use("/api/v1/admin/addresses", require("./api/v1/admin/addresses"));
app.use("/api/v1/admin/orders", require("./api/v1/admin/orders"));
app.use("/api/v1/auth", require("./api/v1/auth"));
app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/shop_carts", require("./api/v1/shop_carts"));
app.use("/api/v1/orders", require("./api/v1/orders"));
app.use("/api/v1/addresses", require("./api/v1/addresses"));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    code: "error",
    info: err
  });
});

var port = process.env.PORT || 3009;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
require("./db");

// 初始化超级管理员
async function initManager() {
  const isExist = await Manager.count({
    userName: "admin"
  });
  if (isExist == 0) {
    const slat = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync("admin", slat); // 对密码进行加密
    const admin = new Manager({
      userName: "admin",
      password: pwd,
      nickName: "超级管理员"
    });
    await admin.save();
  }
}
initManager();
