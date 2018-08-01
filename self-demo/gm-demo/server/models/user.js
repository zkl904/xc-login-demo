// 作用:  里将数据库和表结构文件连接起来  mserver层


const db = require('../config/db.js'),
  userModel = '../schema/user.js'; // 引入user的表结构\

const TodolistDb = db.Todolist; // 引入数据库

const User = TodolistDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。


// 查询用户名
const getUserByName = async function(name){
  const userInfo = await User.findOne({
    where: {
      name: name
    }
  })
  return userInfo
}

module.exports = {
  getUserByName
}
