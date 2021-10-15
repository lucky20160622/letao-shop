//1.引入model数据增加操作
const { register } = require("../model/users");
const Joi = require("joi");
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
  });
  //进行校验
  const verify = schema.validate({ username, password, mobile });

  //如果校验不通过，要return
  if (verify.error) {
    ctx.body = {
      status: 400,
      message: verify.error.details[0].message,
    };
    return;
  }

  // 操作数据数据模型层 model
  const result = await register(username, password, mobile);
  ctx.body = {
    status: 200,
    msg: "注册成功",
  };
};
