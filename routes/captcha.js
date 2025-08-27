var express = require('express');
var router = express.Router();
const { captchaService } = require('../service/captchaService');

// 获取验证码
router.get('/', async function (req, res) {
  const captcha = captchaService();
  req.session.captcha = captcha.text;
  // 设置header
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(captcha.data);
});

module.exports = router;
