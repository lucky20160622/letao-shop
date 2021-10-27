export default ({ $request }, inject) => {

  inject('api', {
    /**
     * 首页轮播图接口
     * @returns 
     */
    Swiper() {
      return $request.$get('/banners');
    },
    /**
     * 获取首页宫格数据
     * @returns 
     */
    GridList() {
      return $request.$get('/gridlist');
    },

    /**
     * 获取首页运动专区数据
     * @returns 
     */
    SportList() {
      return $request.$get('/sportList');
    },
    /**
  * 获取一级分类页面数据
  * @returns 
  */
    OneCategory() {
      return $request.$get('/oneCategory');
    },
    /**
* 获取二级分类页面数据
* @returns 
*/
    TwoCategory(cid) {
      return $request.$get(`/twoCategory?id=${cid}`);
    },
  });
}