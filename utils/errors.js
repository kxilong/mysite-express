// 自定义错误

class ServiceError extends Error {
  /**
   *
   * @param {*} message 错误消息
   * @param {*} code 错误码
   */
  constructor(message, code) {
    super(message);
    this.code = code;
  }
  toResponeJSON() {
    return {
      code: this.code,
      message: this.message,
      data: null,
    };
  }
}

// 文件上传错误
exports.UploadError = class extends ServiceError {
  constructor(message) {
    super(message, 413);
  }
};

// 验证错误错误
exports.ValidatenError = class extends ServiceError {
  constructor(message) {
    super(message, 406);
  }
};

// 禁止访问错误
exports.ForbiddenError = class extends ServiceError {
  constructor(message) {
    super(message, 403);
  }
};

// 资源未找到错误
exports.NotFoundError = class extends ServiceError {
  constructor() {
    super('not found', 404);
  }
};

// 其他错误
exports.UnKnownError = class extends ServiceError {
  constructor() {
    super('service interal error', 500);
  }
};

module.exports.ServiceError = ServiceError;
