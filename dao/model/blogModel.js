// 登录模型
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

module.exports = sequelize.define(
  'blog',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '作者ID（外键）',
      references: {
        model: 'admin',
        key: 'id',
      },
      validate: {
        notEmpty: { msg: '作者ID（外键）不能为空' },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '文章标题',
      validate: {
        notEmpty: { msg: '文章标题不能为空' },
      },
    },
    conetnt: {
      type: DataTypes.STRING,
      comment: '文章内容',
    },
    summary: {
      type: DataTypes.STRING,
      comment: '文章摘要',
    },
    cover_image: {
      type: DataTypes.STRING,
      comment: '封面图URL',
    },
    view_count: {
      type: DataTypes.STRING,
      defaultValue: 0,
      comment: '阅读量',
    },
    like_count: {
      type: DataTypes.STRING,
      defaultValue: 0,
      comment: '点赞数',
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      comment: '点赞数',
    },
  },
  {
    freezeTableName: true, // 禁用表名复数化
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['title'],
      },
    ],
    comment: '博客表',
  }
);
