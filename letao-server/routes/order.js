//1.导入koa-router
const router = require("koa-router")()

//2.导入controller逻辑业务代码
const { order, notify } = require("../controller/order");

//3.微信下单
router.post("/order", order);

//4.微信下单回调
router.post('/pay/notify', notify)

//5.订单查询
router.post('queryOrder',queryOrder)

//6.导出
module.exports = router;
