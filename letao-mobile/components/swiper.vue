<template>

  <!-- 1.轮播图首页 -->
  <van-swipe
    class="my-swipe"
    :autoplay="3000"
    indicator-color="white"
  >
    <van-swipe-item
      v-for="item in swipeList"
      :key="item.id"
    >
      <van-image :src="item.img_src" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: ["swipeList"],
};
</script>