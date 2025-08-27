const JWT = require('jsonwebtoken');
const md5 = require('md5');

// 格式化响应请求格式
module.exports.formatRespone = function (code, msg, data) {
  return {
    code,
    msg,
    data,
  };
};

module.exports.analysisToken = function (token) {
  return JWT.verify(token.split(' ')[1], md5(process.env.JWT_SERCET));
};
