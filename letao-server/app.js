const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const jwt = require('koa-jwt')
const { jwtSecret } = require('./config/index')
const xmlParser = require('koa-xml-body')
//配置信息
require("dotenv").config();
//加载路由
const index = require("./routes/index");
const users = require("./routes/users");
const category = require("./routes/category");
const sms = require("./routes/sms");
const order = require('./routes/order')
// error handler
onerror(app);

// middlewares
app.use(xmlParser())
//使用koa-jwt中间件  来拦截 客户端在调用服务器接口时，如果请求头没有设置token 返回401
app.use(function (ctx, next) {
  // console.log(ctx.headers);
  return next().catch((err) => {
    console.log(err);
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

//设置哪些接口需要token
app.use(jwt({ secret: jwtSecret }).unless({ path: [/^\/public/, /^\/register/, /^\/login/, /^\/sendsms/] }));
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(category.routes(), category.allowedMethods())
app.use(sms.routes(), sms.allowedMethods())
app.use(order.routes(), order.allowedMethods())
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
