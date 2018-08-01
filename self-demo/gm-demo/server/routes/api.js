// 需要验证token

const api = require('../controllers/needlogin.js')
const koaRouter = require('koa-router');
const router = koaRouter()

router.post('/user', api.getUserInfo); // 定义url的参数是id,用user的auth方法引入router  去查询 某个 某个id返回的数据

module.exports = router; // 把router规则暴露出去
