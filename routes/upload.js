var express = require('express');
var router = express.Router();
const multer = require('multer');
const { uploadService } = require('../service/uploadService');
const { formatRespone } = require('../utils/tool');
const { UnKnownError } = require('../utils/errors');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制文件大小 5MB
  },
  fileFilter: (req, file, cb) => {
    // 验证图片格式
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传 JPG、PNG、GIF、WebP 格式的图片'), false);
    }
  },
});

// 上传图片
router.post('/', upload.single('image'), async function (req, res) {
  try {
    const result = await uploadService(req);
    if (result.CommonMsg.Status < 300) {
      // 生成图片访问 URL（需确保存储桶有公共读权限或使用签名 URL）
      const imageUrl = `https://${process.env.HW_OBS_BUCKET}.${process.env.HW_OBS_SERVER}/${result.fileName}`;

      res.send(
        formatRespone(0, '上传成功', {
          url: imageUrl,
          fileName: result.fileName,
          size: req.file.size,
          mimetype: req.file.mimetype,
        })
      );
    } else {
      throw new UnKnownError(
        `OBS 上传失败: ${JSON.stringify(result.CommonMsg)}`
      );
    }
  } catch (error) {
    throw new UnKnownError(error.message);
  }
});

module.exports = router;
