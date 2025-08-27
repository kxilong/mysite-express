// 模型同步初始化
const sequelize = require('./dbConnect');
const Admin = require('./model/adminModel');
const md5 = require('md5');

(async () => {
  await sequelize.sync({ alert: true });
  // 初始化数据
  const adminCount = await Admin.count();
  if (!adminCount) {
    await Admin.create({
      loginId: 'admin',
      name: '超级管理员',
      loginPwd: md5('123456'),
    });
  }
  console.log(`数据库初始化完成...`);
})();
