var express = require('express');
var router = express.Router();
const {
  addBlog,
  queryBlog,
  fetchBlogsById,
} = require('../service/blogService');

router.post('/', async function (req, res) {
  const data = await addBlog(req.body);
  res.send(data);
});

router.get('/', async function (req, res) {
  const data = await queryBlog();
  res.send(data);
});

router.get('/:id', async function (req, res) {
  const data = await fetchBlogsById(req.params.id);
  res.send(data);
});

module.exports = router;
