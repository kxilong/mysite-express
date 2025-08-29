var { addCommentDao, getCommentsByBlogIdDao } = require('../dao/commentDao');
const { formatRespone } = require('../utils/tool');

// 添加评论
module.exports.insertCommentService = async comment => {
  try {
    await addCommentDao(comment);
    return formatRespone(0, '评论成功');
  } catch (error) {
    console.log(error.name, error.message);
  }
};

// 查询评论
module.exports.getCommentsByBlogIdService = async blogId => {
  try {
    const comments = await getCommentsByBlogIdDao(blogId);
    return formatRespone(0, 'success', comments);
  } catch (error) {
    console.log(error.name, error.message);
  }
};
