const blogModel = require('./model/blogModel');
const adminModel = require('./model/adminModel');

module.exports.addBlogDao = async loginInfo => {
  return await blogModel.create(loginInfo);
};

module.exports.queryBlog = async ({
  page = 1,
  pageSize = 10,
  sortBy = 'created_at',
  order = 'DESC',
} = {}) => {
  // 计算偏移量（分页用）
  const offset = (page - 1) * pageSize;
  const { count, rows } = await blogModel.findAndCountAll({
    include: [
      {
        model: adminModel,
        as: 'author',
        attributes: ['id', 'name'],
      },
    ],
    // 分页配置
    limit: pageSize,
    offset,
    // 排序配置
    order: [[sortBy, order]],
  });
  return {
    page,
    pageSize,
    count,
    rows,
  };
};

module.exports.fetchBlogsById = async id => {
  return await blogModel.findOne({
    include: [
      {
        model: adminModel,
        as: 'author',
        attributes: ['id', 'name'],
      },
    ],
  });
};
