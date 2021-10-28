<template>
  <div class="category">
    <van-tree-select
      height="80vh"
      :items="oneCategoryList"
      :main-active-index.sync="active"
      @click-nav='navHandle'
    >
      <template #content>
        <div
          v-for="item in twoCategory"
          :key="item.id"
        >
          <van-image
            v-if="active === 0"
            :src="item.brandLogo"
          />
          <p>{{item.brandName}}</p>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [{ text: "分组 1" }, { text: "分组 2" }],
    };
  },
  //方法
  methods: {
    async navHandle(index) {
      // 替换url路由成带参数的路由
      this.$router.replace(`/category?active=${index}`);
      //1.点击左侧id
      let id = this.oneCategoryList[index]["id"];
      console.log(this.oneCategoryList);
      //2.加载二级分类
      const { twoCategory } = await this.$api.TwoCategory(id);
      //3.把点击到的二级分类赋值显示出来
      this.twoCategory = twoCategory;
    },
  },
  //一级分类
  async asyncData({ $api, query }) {
    // 读取url中的active参数
    let active = query.active || 0;
    // 按照vant 组件对数据的要求，所以我们需要对返回的数据进行加工处理
    let { oneCategoryList } = await $api.OneCategory();
    oneCategoryList = oneCategoryList.map((item) => {
      return {
        text: item.categoryName,
        ...item,
      };
    });

    //二级分类
    let { twoCategory } = await $api.TwoCategory(oneCategoryList[active]["id"]);
    console.log("twoCategory", twoCategory);
    return {
      oneCategoryList,
      twoCategory,
      active
    };
  },
};
</script>