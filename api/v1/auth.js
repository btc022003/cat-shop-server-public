const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // 对jwt数据进行加密处理
const { User, Manager } = require("../../models");
const { jwtSecret } = require("../../utils/config");

router.post("/login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      userName
    });
    if (user) {
      const isValidated = bcrypt.compareSync(password, user.password); // 验证密码
      if (isValidated) {
        const token = jwt.sign(
          {
            userId: user.id
          },
          jwtSecret,
          {
            expiresIn: "10h"
          }
        );
        res.json({
          code: "success",
          token
        });
      } else {
        res.json({
          code: "error",
          message: "用户密码错误！"
        });
      }
    } else {
      res.json({
        code: "error",
        message: "user not found"
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/reg", async (req, res, next) => {
  try {
    const { userName } = req.body;
    console.log(userName);
    const isUserExist = await User.count({
      userName
    });
    if (isUserExist > 0) {
      res.json({
        code: "error",
        message: "用户名已存在！"
      });
    } else {
      const user = new User(req.body);
      const { password } = req.body;
      const slat = bcrypt.genSaltSync(10);
      const pwd = bcrypt.hashSync(password, slat); // 对密码进行加密
      user.password = pwd;
      const userResult = await user.save();
      // res.json(userResult);
      const token = jwt.sign(
        {
          userId: userResult.id
        },
        jwtSecret,
        {
          expiresIn: "10h"
        }
      );
      res.json({
        code: "success",
        token
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/manager_login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res.json({
        code: "error",
        message: "参数错误！"
      });
      return;
    }
    const u = await Manager.findOne({ userName });
    if (u) {
      const isPwdValidated = bcrypt.compareSync(password, u.password);
      if (isPwdValidated) {
        res.json({
          code: "success",
          token: jwt.sign(
            {
              userId: u.id
            },
            jwtSecret,
            {
              expiresIn: "10h"
            }
          )
        });
      } else {
        res.json({
          code: "error",
          message: "用户密码错误！"
        });
      }
    } else {
      res.json({
        code: "error",
        message: "用户信息不存在！"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
