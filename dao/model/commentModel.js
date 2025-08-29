const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');

module.exports = sequelize.define(
  'comment',
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '评论内容',
      validate: {
        notEmpty: { msg: '评论内容不能为空' },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'admin',
        key: 'id',
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id',
      },
      validate: {
        notEmpty: { msg: '文章ID（外键）不能为空' },
      },
    },
  },
  {
    freezeTableName: true, // 禁用表名复数化
    underscored: true,
    comment: '评论表',
  }
);
