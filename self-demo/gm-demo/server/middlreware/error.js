const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')
const util = require('util')
const verify = util.promisify(jwt.verify)  //作用: util.promisify  把方法变成一个异步函数    jwt.verify（token，secretOrPublicKey，[options，callback]）   验证token的合法性  参考 https://segmentfault.com/a/1190000009494020


/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      const token = ctx.header.authorization  // 获取jwt
      if(token) {
        let payload
        try {
          payload = await verify(token.split(' ')[1], secret.sign)  // 解密payload，获取用户名和ID
          ctx.user = {   // 后续的操作中用到, 用来验证信息的准确性
            name: payload.name,
            id: payload.id
          }
        } catch (err) {
          console.log('token verify fail: ', err)
        }
      }

      console.log(`token: ${token}`)

      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.body = {
          errorCode: '401',
          message: '认证失败'
        }
      } else {
        err.status = 404;
        ctx.body = {
          errorCode: '9999',
          message: '404'
        };
      }
    }
  }
}
