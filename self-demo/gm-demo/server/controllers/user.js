const user = require('../models/user.js');
const jwt = require('jsonwebtoken');    // 下载koa-jwt 会下载这个包
const bcrypt = require('bcryptjs');  // 加密插件
const secret = require('../config/secret.json')


// 登陆
const postUserAuth = async function (ctx) {
  console.log('12345')
  console.log(ctx.request.body)
  const data = ctx.request.body; // post过来的数据存在request.body里   使用request.body 使用的是post方法
  const userInfo = await user.getUserByName(data.name);  // 获得sql返回的信息
  //
  if(userInfo != null){ // 如果查无此用户会返回null
    if(!bcrypt.compareSync(data.pass, userInfo.pass)){ // 验证密码是否正确
    // if(userInfo.pass != data.pass){
      ctx.body = {
        errorCode: '1000',
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    }else{ // 如果密码正确
      const userToken = {
        name: userInfo.name,
        id: userInfo.id
      }
      const token = jwt.sign(userToken,secret.sign, {expiresIn: '1h'}); // 签发token
      // ctx.body = {
      //   success: true,
      //   token: token, // 返回token
      // }
      ctx.body = {
        errorCode: '0000',
        success: true, // success标志位是方便前端判断返回是正确与否
        info: '登陆成功！',
        token: token
      }
    }
  }else{
    ctx.body = {
      errorCode: '2000',
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

module.exports = {
  postUserAuth
}
