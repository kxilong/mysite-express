const adminModel = require('./model/adminModel');

// 登录
module.exports.loginDao = async loginInfo => {
  return await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
};

// 修改信息
module.exports.updateLoginDao = async newAccountInfo => {
  return await adminModel.update(newAccountInfo, {
    where: { loginId: newAccountInfo.loginId },
  });
};
