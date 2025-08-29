var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var md5 = require('md5');
var { expressjwt } = require('express-jwt');
const session = require('express-session');
var { ForbiddenError, ServiceError } = require('./utils/errors');

require('express-async-errors');
// 引入环境变量
require('dotenv').config();
// 引入数据库
require('./dao/db');

var adminRouter = require('./routes/admin');
var captchaRouter = require('./routes/captcha');
var uploadRouter = require('./routes/upload');
var blogCategoryRouter = require('./routes/blogCategory');
var blogRouter = require('./routes/blog');
var commentRouter = require('./routes/comment');

var app = express();

// 引入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SERCET,
    resave: true,
    saveUninitialized: true,
  })
);
// 验证token
app.use(
  expressjwt({
    secret: md5(process.env.JWT_SERCET),
    algorithms: ['HS256'],
  }).unless({
    path: [
      { url: '/api/admin/login', methods: ['POST'] },
      { url: '/res/captcha', methods: ['GET'] },
      { url: '/api/upload-image', methods: ['POST'] },
    ],
  })
);

// 路由
app.use('/api/admin', adminRouter);
app.use('/res/captcha', captchaRouter);
app.use('/api/upload-image', uploadRouter);
app.use('/api/categories', blogCategoryRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.name === 'UnauthorizedError') {
    res.send(new ForbiddenError('无效的Token').toResponeJSON());
  } else if (err instanceof ServiceError) {
    res.send(err.toResponeJSON());
  }
});

module.exports = app;
