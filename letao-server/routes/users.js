//1.导入koa-router
const router = require("koa-router")();

//2.导入controller逻辑业务代码
const { register, login } = require("../controller/users");

//3.路由用户注册
router.post("/register", register);

//4.登录
router.post("/login", login);

//5.导出
module.exports = router;
