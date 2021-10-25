<template>
  <div>
    <!-- 1.轮播图组件 -->
    <Swiper :swipeList="swipeList" />
    <!-- 2.宫格组件 -->
    <GridList :gridList='gridList' />
    <!-- 3.活动专区组件 -->
    <Activity />
    <!-- 4.运动专区组件 -->
    <SportList :sportList='sportList'/>
  </div>
</template>

<script>
export default {
  //asyncData刷新页面时,运行在服务端,服务端调用服务端接口不存在跨域
  //跨域是浏览器端的一种安全策略
  async asyncData({ $axios }) {
    //轮播图接口
    const { swipeList } = await $axios.$get("/banners");
    const { gridList } = await $axios.$get("/gridList");
    const {sportList}=await $axios.$get('/sportList')
    return {
      swipeList,
      gridList,
      sportList
    };
  },
};
</script>
