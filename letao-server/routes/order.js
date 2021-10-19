//1.导入koa-router
const router = require("koa-router")()

//2.导入controller逻辑业务代码
const { order } = require("../controller/order");

//3.下单
router.post("/order", order);

//4.导出
module.exports = router;
