// 登录模型
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

module.exports = sequelize.define(
  'admin',
  {
    // 主键 ID
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户ID',
    },
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // 禁用表名复数化
    createdAt: false,
    updatedAt: false,
  }
);
