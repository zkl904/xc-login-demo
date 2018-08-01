const user = require('../models/needlogin.js');
const jwt = require('jsonwebtoken');    // 下载koa-jwt

const getUserInfo = async function (ctx) {
  console.log(ctx.request)
  console.log(ctx.request.body)
  const data = ctx.request.body; // post过来的数据存
  const id = data.id; // 获取url里传过来的参数里的id   params:  通过链接使用的是get方法
  const result = await user.getUserById(id);  // 调用model的方法  ,取到返回的结果
  ctx.body = {
    errorCode : '0000',
    result
  }  // 将请求的结果放到response的body里返回
}

module.exports = {
  getUserInfo // 导出getUserById的方法，将会在controller里调用
}
