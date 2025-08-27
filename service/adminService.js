const md5 = require('md5');
const { loginDao, updateLoginDao } = require('../dao/adminDao');
const JWT = require('jsonwebtoken');
const { ValidatenError } = require('../utils/errors');
const { formatRespone } = require('../utils/tool');

// 登录
module.exports.loginService = async loginInfo => {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  var data = await loginDao(loginInfo);
  console.log(data, 'data>>>>>');

  if (data && data.dataValues) {
    var { id, loginId, loginPwd, remember } = data.dataValues;
    // 处理是否7天免登录，如果没有则为1天
    var loginRemember = null;
    if (remember) {
      loginRemember = parseInt(remember);
    } else {
      loginRemember = 1;
    }
    data = {
      id,
      loginId,
      loginPwd,
    };

    // 生成token
    var token = JWT.sign(
      { id: data.id, loginId: data.loginId },
      md5(process.env.JWT_SERCET),
      {
        expiresIn: 60 * 60 * 24 * loginRemember,
      }
    );

    return {
      data,
      token,
    };
  }
  return { data };
};

// 修改登录信息
module.exports.updateLoginService = async updateInfo => {
  const data = await loginDao({
    loginId: updateInfo.loginId,
    loginPwd: md5(updateInfo.oldLoginPwd),
  });

  if (data && data.dataValues) {
    await updateLoginDao({
      loginPwd: md5(updateInfo.loginPwd),
      loginId: updateInfo.loginId,
      name: updateInfo.name,
    });
    return formatRespone(0, '', {
      loginId: updateInfo.loginId,
      name: updateInfo.name,
      id: data.id,
    });
  } else {
    throw new ValidatenError('旧密码不正确');
  }
};
