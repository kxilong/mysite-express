var express = require('express');
var router = express.Router();
var {
  insertCommentService,
  getCommentsByBlogIdService,
} = require('../service/commentsService');

router.post('/', async function (req, res) {
  res.send(await insertCommentService(req.body));
});

// 通过博客id获取评论
router.get('/:id', async function (req, res) {
  res.send(await getCommentsByBlogIdService(req.params.id));
});
module.exports = router;
