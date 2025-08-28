const blogCategoryModel = require('./model/blogCategoryModel');

// 查询
module.exports.findAll = async () => {
  return await blogCategoryModel.findAll();
};

// 增加
module.exports.add = async cateInfo => {
  return await blogCategoryModel.create({
    name: cateInfo.name,
    userId: cateInfo.userId,
  });
};

// 修改
module.exports.modify = async cateInfo => {
  return await blogCategoryModel.update(cateInfo, {
    where: { id: cateInfo.id },
  });
};

// 删除
module.exports.deleteCate = async cateInfo => {
  return await blogCategoryModel.destroy({
    where: { id: cateInfo.id },
  });
};
