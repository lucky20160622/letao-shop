const router = require("koa-router")();
//引入girdlst宫格数据
const { gridlist, banners, sportList } = require("../controller/index");
//首页宫格数据
router.get("/gridlist", gridlist);
//轮播图
router.get("/banners", banners);
//运动专区
router.get("/sportList", sportList);
module.exports = router;
