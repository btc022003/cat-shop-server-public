const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

function getLoginUserFromJWT(req) {
  const token = req.headers.authorization.split(' ')[1]; // 获取token
  const decoded = jwt.verify(token, jwtSecret);
  const { userId } = decoded;
  return userId
}

module.exports = {
  getLoginUserFromJWT
}
