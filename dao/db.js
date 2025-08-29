// 模型同步初始化
const sequelize = require('./dbConnect');
const Admin = require('./model/adminModel');
const BlogCategory = require('./model/blogCategoryModel');
const Blog = require('./model/blogModel');
const Comment = require('./model/commentModel');
const md5 = require('md5');

(async () => {
  relationModel();
  // 同步模型
  syncModel();
  initData();
})();

async function syncModel() {
  try {
    await sequelize.sync({ alter: true });
    console.log('\n✅ 所有模型均已成功同步');
  } catch (error) {
    console.error('\n❌ 同步过程出错：', error.message);
  }
}

// 关联模型
function relationModel() {
  // 将管理员表和博客分类表关联起来，一对多关系
  Admin.hasMany(BlogCategory, {
    foreignKey: 'user_id', // 对应博客表中的外键字段
    sourceKey: 'id', // 用户表中用于关联的字段（主键）
    onDelete: 'CASCADE',
    as: 'category', // 关联查询时的别名
  });
  BlogCategory.belongsTo(Admin, {
    foreignKey: 'user_id',
    sourceKey: 'id',
  });
  /****************博客和用户 */
  Admin.hasMany(Blog, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    as: 'blog',
  });
  Blog.belongsTo(Admin, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    as: 'author',
  });
  /******博客和评论 */
  Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    as: 'comment',
  });
  Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    sourceKey: 'id',
  });
}

// 初始化数据
async function initData() {
  const adminCount = await Admin.count();
  if (!adminCount) {
    await Admin.create({
      loginId: 'admin',
      name: '超级管理员',
      loginPwd: md5('123456'),
    });
  }
  // 初始博客分类
  const blogCategoryCount = await BlogCategory.count();
  if (!blogCategoryCount) {
    await BlogCategory.create({
      name: '默认分类',
      userId: 1,
    });
  }
  console.log('\n✅ 数据库初始化完成');
}
