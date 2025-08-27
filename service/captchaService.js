const svgCaptcha = require('svg-captcha');

// 生成验证码
module.exports.captchaService = () => {
  return svgCaptcha.create({
    size: 4,
    noise: 6,
    color: true,
  });
};
