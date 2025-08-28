const ObsClient = require('esdk-obs-nodejs');
const path = require('path');
const { Readable } = require('stream');

// 1. 配置华为云 OBS 客户端（从环境变量读取密钥，避免硬编码）
const obsClient = new ObsClient({
  access_key_id: process.env.HW_ACCESS_KEY,
  secret_access_key: process.env.HW_SECRET_KEY,
  server: process.env.HW_OBS_SERVER, // 例如: obs.cn-north-4.myhuaweicloud.com
  bucket: process.env.HW_OBS_BUCKET, // 你的存储桶名称
});

// 上传图片到华为obs
module.exports.uploadService = async req => {
  // 检查是否有文件
  if (!req.file) {
    return res.status(400).json({
      code: 400,
      message: '请上传图片文件',
    });
  }
  // 生成唯一文件名（避免重复）
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}${path.extname(req.file.originalname)}`;

  // 上传到华为云 OBS
  const result = await obsClient.putObject({
    Bucket: process.env.HW_OBS_BUCKET,
    Key: fileName,
    Body: Readable.from(req.file.buffer), // 从内存读取文件缓冲区
    ContentType: req.file.mimetype, // 设置文件 MIME 类型
  });
  return {
    ...result,
    fileName,
  };
};
