// 连接数据库
const { Sequelize } = require('sequelize');

// sequelize 实例化
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // 禁用日志输出
  }
);

module.exports = sequelize;
