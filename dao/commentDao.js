const commentModel = require('./model/commentModel');

// 添加评论
module.exports.addCommentDao = async commentInfo => {
  return await commentModel.create(commentInfo);
};

// 通过博客id获取评论
module.exports.getCommentsByBlogIdDao = async blogId => {
  return await commentModel.findAll({
    where: {
      blog_id: blogId,
    },
  });
};
