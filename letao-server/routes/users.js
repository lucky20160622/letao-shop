//导入koa-router
const router = require("koa-router")();
const { register } = require("../controller/users");
//前缀
router.prefix("/users");

//路由用户注册
router.post("/register", register);

//导出
module.exports = router;
