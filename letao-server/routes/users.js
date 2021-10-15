//导入koa-router
const router = require("koa-router")();
const { register, login } = require("../controller/users");
//前缀
router.prefix("/users");

//路由用户注册
router.post("/register", register);

//登录
router.post("/login", login);
//导出
module.exports = router;
