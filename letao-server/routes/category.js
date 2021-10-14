const router = require("koa-router")();
const { oneCategory } = require("../controller/category");

// 获取一级分类
router.get("/oneCategory", oneCategory);

module.exports = router;
