const router = require('express').Router();
const jwt = require('jsonwebtoken'); // 对jwt数据进行加密处理
const {
  User,
  Manager
} = require('../../models');
const {
  jwtSecret
} = require('../../utils/config');

router.get('/info', async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // 获取token
    const decoded = jwt.verify(token, jwtSecret);
    const {
      userId
    } = decoded;
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
})

router.get('/manager_info', async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // 获取token
    const decoded = jwt.verify(token, jwtSecret);
    const {
      userId
    } = decoded;
    const user = await Manager.findById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
