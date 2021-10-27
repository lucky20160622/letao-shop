<template>
  <div class="category">
    <van-tree-select
      height="80vh"
      :items="oneCategoryList"
      :main-active-index.sync="active"
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
      active: 0,
      items: [{ text: "分组 1" }, { text: "分组 2" }],
    };
  },
  //一级分类
  async asyncData({ $api }) {
    let active = 0;
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
    };
  },
};
</script>