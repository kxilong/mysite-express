const {
  query,
  add,
  modify,
  deleteCate,
  findAll,
} = require('../dao/blogCategoryDao');

const { formatRespone } = require('../utils/tool');

module.exports.queryCategory = async info => {
  let result;
  if (info.id) {
    result = await query(info);
  } else {
    result = await findAll();
  }
  return formatRespone(0, '查询成功', result);
};

module.exports.addCategory = async info => {
  try {
    const result = await add(info);
    return formatRespone(0, '添加成功', result);
  } catch ({ errors }) {
    return formatRespone(1, '添加失败', errors);
  }
};

module.exports.delCategory = async info => {
  result = await deleteCate(info);
  return formatRespone(0, '操作成功', result);
};

module.exports.updateCategory = async updateInfo => {
  const result = await modify(updateInfo);
  return formatRespone(0, '更新成功', result);
};
