# JSON网络令牌JWT

## 1.什么是身份验证

​      日常生活中的**身份验证**的场景:  比如进入公司的大楼时，需要携带工牌；打卡上班时，需要指纹识别；打开工作电脑时，需要输入密码。

## 2.什么是JSON网络令牌

JSON Web Token (JWT) 是一个开放标准 ( [RFC 7519](https://tools.ietf.org/html/rfc7519) )，用于在各方之间作为 JSON 对象安全地传输信息。<font color='red'>就是通过用户名和密码来生成token确认用户的身份，确认过身份的用户称为为**授权用户(Authenticated user)**。</font>

全称 `JSON Web Token`， 是目前最流行的跨域认证解决方案。基本的实现是服务端认证后，生成一个 `JSON` 对象，发回给用户。用户与服务端通信的时候，都要在请求头带上这个 `JSON` 对象

用户在网站上输入用户名和密码，如果不加密的话会很容易破解，导致不法分子盗用用户信息，所以我们要给用户信息加密，这就用到了<font color='red'>JSON WEB TOKE(JWT)</font>

## 3.JSON网络令牌的作用

这是使用JWT最常见的场景，用户登录后，每个后续请求都将包含JWT，允许用户访问该令牌允许的路由、服务和资源

## 4.JSON WEB Toke结构

就是令牌token，是一个String字符串，一共分为三部分，分别是<font color='red'>标题、有效载荷、签名</font>

```javascript
1.标题 {"alg":"HS256","typ":"JWT"}
2.有效载荷  {"username":"letao","password":"123456","iat":1634524068,"exp":1634527668}
3.签名  xxxxx.yyyyy.zzzzz
```

![](C:\Users\Lenovo\Documents\letao-shop\项目文档\images\Snipaste_2021-10-18_17-50-26.png)

JWT格式：![](C:\Users\Lenovo\Documents\letao-shop\项目文档\images\encoded-jwt3.png)

## 5.JSON网络令牌如何工作？

在身份验证中，当用户使用其凭据成功登录时，将返回JSON  Web Token。由于令牌是凭证，因此必须非常小心以防止出现安全问题。通常，您将不会将令牌保留的时间超过所需时间。

每当用户想要访问受保护的路由或资源时，用户代理应该发送 JWT，通常在使用**Bearer**模式的**Authorization**标头中。标题的内容应如下所示：

```javascript
Authorization: Bearer <token>
```

![](C:\Users\Lenovo\Documents\letao-shop\项目文档\images\image-20211015005147891.png)

## 6.JWT的使用（重点）

1.安装jsonwebtoken

```javascript
yarn add jsonwebtoken
```

2.controller文件夹下找到users文件，登录成功之后使用jwt根据用户名和密码生成token返回

2.1导入JWT

```javascript
const jwt=require('jsonwebtoken')
```

2.2封装jwt机密字符，在config文件里进行封装

```javascript
module.exports.jwtSecret='letao'
```

3.在用户登录的时候，根据用户名和密码生成token

```javascript
const token=jwt.sign({
    username,
    password
},jwtSecret,{expiresIn:'1h'})   //expiresIn是代表token有效期为1h
```

4.验证JWT令牌的KOA中间件

4.1安装koa-jwt

```javascript
yarn add koa-jwt
```

4.2在app.js中引入koa-jwt插件,以及引入封装的jwt密钥

```javascript
var jwt = require('koa-jwt');
const jwtSecret = require('./config/index')
```

4.3使用中间件

```javascript
//使用koa-jwt中间件  来拦截 客户端在调用服务器接口时，如果请求头没有设置token 返回401
//当token失效的时候会触发
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

//设置哪些接口需不要token，其中登录和注册的时候不需要token，因为用户还没有登录上，没法返回token
app.use(jwt({ secret: jwtSecret }).unless({ path: [/^\/public/, /^\/register/, /^\/login/] }));
```

