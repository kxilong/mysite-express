var express = require('express');
var router = express.Router();
const {
  queryCategory,
  addCategory,
  delCategory,
  updateCategory,
} = require('../service/blogCategoryService');

router.get('/', async function (req, res) {
  const data = await queryCategory(req.query);
  res.send(data);
});

router.post('/', async function (req, res) {
  const data = await addCategory(req.body);
  res.send(data);
});

router.delete('/', async function (req, res) {
  const data = await delCategory(req.query);
  res.send(data);
});

router.put('/', async function (req, res) {
  const data = await updateCategory(req.query);
  res.send(data);
});

module.exports = router;
