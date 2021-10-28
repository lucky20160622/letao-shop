<template>
  <div>
    <van-overlay
      :show="show"
      class="loading"
    >
      <van-loading color='#1989fa'>加载中...</van-loading>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    start() {
      this.show = true;
    },
    finish() {
      this.show = false;
    },
  },
};
</script>
<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>