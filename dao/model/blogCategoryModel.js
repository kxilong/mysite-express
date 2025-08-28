// 登录模型
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

module.exports = sequelize.define(
  'category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '分类名称',
      validate: {
        notEmpty: { msg: '分类名称不能为空' },
        len: { args: [1, 50], msg: '分类名称长度需在 1-50 字符之间' },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '所属用户ID（外键）',
      validate: {
        isInt: { msg: '用户ID必须是整数' }, // 验证用户ID格式
      },
      references: {
        model: 'admin', // 关联的数据库表名
        key: 'id', // 关联的字段（用户表主键）
      },
    },
  },
  {
    freezeTableName: true, // 禁用表名复数化
    underscored: true, //
    indexes: [
      // 联合唯一索引：同一用户下分类名称不能重复
      {
        unique: true,
        fields: ['user_id', 'name'],
      },
    ],
    comment: '分类表',
  }
);
