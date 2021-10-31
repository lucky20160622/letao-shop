<template>
  <div class="container">
    <!-- 标题 -->
    <header>
      <van-nav-bar
        :title="title"
        left-text="返回"
        right-text="按钮"
        left-arrow
      />
    </header>
    <!-- 主体 -->
    <main>
      <Nuxt />
    </main>
    <!-- 底部导航 -->
    <footer>
      <van-tabbar v-model="active">
        <van-tabbar-item
          name='home'
          icon="home-o"
          to='/'
        >首页</van-tabbar-item>
        <van-tabbar-item
          name='category'
          icon="search"
          to='/category'
        >分类</van-tabbar-item>
        <van-tabbar-item
          name='cart'
          icon="shopping-cart-o"
          to='/cart'
        >购物车</van-tabbar-item>
        <van-tabbar-item
          name='my'
          icon="friends-o"
          to='/my'
        >我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>
<script>
const Cookie = require("js-cookie");
export default {
  data() {
    return {
      active: this.$route.name,
      title: "",
    };
  },
  methods: {
    //刷新页面重新设置标题
    refHandle() {
      this.title = {
        index: "乐淘-首页",
        category: "乐淘-分类",
        cart: "乐淘-购物车",
        my: "乐淘-我的",
      }[this.$route.name];
    },
  },
  //页面刷新会触发mounted asyncData钩子只能在页面组件中使用
  mounted() {
    //重新设置标题
    this.refHandle();
  },
  watch: {
    //监听路由的变化
    $route() {
      // console.log(this.$route);
      //设置标题
      this.refHandle();
      //设置高亮
      // let ab = Cookie.get("token");
      // console.log(ab);
      // if (!ab) {
      //   this.$router.push("/my/login");
      // }
    },
  },
};
</script>