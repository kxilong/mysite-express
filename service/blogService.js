const { addBlogDao, queryBlog, fetchBlogsById } = require('../dao/blogDao');

const { formatRespone } = require('../utils/tool');

module.exports.addBlog = async info => {
  const result = await addBlogDao(info);
  return await formatRespone(0, '添加成功', result);
};

module.exports.queryBlog = async params => {
  const { count, rows, page, pageSize } = await queryBlog(params);
  const blogList = rows.map(blog => blog.get({ plain: true }));

  return formatRespone(0, '', {
    list: blogList,
    pagination: {
      total: count, // 总条数
      page: Number(page), // 当前页码
      pageSize: Number(pageSize), // 每页条数
      totalPages: Math.ceil(count / pageSize), // 总页数
    },
  });
};

module.exports.fetchBlogsById = async id => {
  const blogDetail = await fetchBlogsById(id);
  return formatRespone(0, '', blogDetail);
};
