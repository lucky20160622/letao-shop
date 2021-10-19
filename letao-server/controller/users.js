//1.引入model中的数据库添加用户，查询用户，登录操作功能
const {
  register,
  findUserByUserName,
  findUserInfo,
} = require("../model/users");

//加密
const { cryptoPassword } = require("../utils/index");
//
const jwt = require('jsonwebtoken')

const { secret, jwtSecret } = require("../config");
const Joi = require("joi");
//注册
module.exports.register = async (ctx) => {
  // 读取到请求参数
  const { username, password, mobile } = ctx.request.body;

  //参数校验 是否合法  不合法会返回提示信息 并return退出
  const schema = Joi.object({
    //用户名
    username: Joi.string().alphanum().min(3).max(12).required(),
    //密码
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    //确认密码
    repeat_password: Joi.ref("password"),
    mobile: Joi.required()
  });

  //进行校验
  const verify = schema.validate({ username, password, mobile });
  console.log(verify)

  //如果校验不通过，要return
  if (verify.error) {
    ctx.body = {
      status: 400,
      message: verify.error.details[0].message,
    };
    return;
  }

  // //查询用户是否已经注册
  const user = await findUserByUserName(username);


  //如果已经注册
  if (user[0]) {
    ctx.body = {
      status: 400,
      message: "当前用户已经注册过了",
    };
    return;
  }

 // 操作数据数据模型层 model
  const result = await register(
    username,
    cryptoPassword(password + secret),
    mobile
  );cryptoPassword
  ctx.body = {
    status: 200,
    message: "注册成功",
  };
};

//登录
module.exports.login = async (ctx) => {

  const { username, password } = ctx.request.body;

  // //再数据库中查询用户信息是否存在
  const result = await findUserInfo(
    username,
    cryptoPassword(password + secret)
  );

  ctx.body = {
    status: 200,
    data: result
  }
  // console.log(result)
  //用户是否存在
  if (result[0]) {
    //根据用户名和密码生成token
    const token = jwt.sign({
      username,
      password
    }, jwtSecret, { expiresIn: '1h' })
    ctx.body = {
      status: 200,
      data: token,
      message: "登录成功",
    };
  } else {
    ctx.body = {
      status: 400,
      message: "登录失败请检查用户名或者密码",
    };
  }
};
