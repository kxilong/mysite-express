var express = require('express');
var router = express.Router();
const { formatRespone, analysisToken } = require('../utils/tool');
const { loginService, updateLoginService } = require('../service/adminService');
const { ValidatenError } = require('../utils/errors');

// 登录
router.post('/login', async function (req, res) {
  console.log(req.session.captcha);
  if (!req.session.captcha) {
    throw new ValidatenError('验证码失效，请重新获取');
  }
  // 校验验证码
  if (req.session.captcha.toLowerCase() !== req.body.captcha.toLowerCase()) {
    throw new ValidatenError('验证码错误');
  }
  const result = await loginService(req.body);
  if (result.token) {
    res.setHeader('Authorization', result.token);
    res.send(formatRespone(0, '登录成功', result.data));
  } else {
    res.send(formatRespone(1, '登录失败', result));
  }
});

// 解析token
router.get('/whoami', function (req, res) {
  var decode = analysisToken(req.get('Authorization'));
  res.send(formatRespone(0, '解析成功', decode));
});

// 修改信息
router.put('/', async function (req, res) {
  const result = await updateLoginService(req.body);
  res.send(result);
});

module.exports = router;
