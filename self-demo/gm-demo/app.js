var Koa = require('koa')
var koaRouter = require('koa-router')
var json = require('koa-json')
var logger = require('koa-logger'); // 引入各种依赖
var bodyParser = require('koa-bodyparser');
var auth = require('./server/routes/auth');
var api = require('./server/routes/api');
var jwt = require('koa-jwt')
var secret = require('./server/config/secret.json')
// 添加中间件校验JWT
const err = require('./server/middlreware/error')


var app = new Koa()
app.use(err())
const router = koaRouter()
app.use(bodyParser());
app.use(json());
app.use(logger());

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function(err, ctx){
  console.log('server error', err);
});

router.use('/auth', auth.routes());
// 需要验证token
router.use("/api",jwt({secret: secret.sign}),api.routes()) // 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致
app.use(router.routes()) // 将路由规则挂载到Koa上。


app.listen(8000)

console.log(`listening on port 8000`)
