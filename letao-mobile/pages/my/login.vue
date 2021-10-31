<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from "vant";
import { verify } from "~/utils";
import { mapMutations } from "vuex";
const Cookie = require("js-cookie");
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["updateToken", "updateUserInfo"]),
    async onSubmit(values) {
      //1.表单校验
      const msg =
        verify.username(this.username) || verify.password(this.password);
      if (msg) {
        Toast(msg);
        return;
      }
      //表单校验通过
      const { status, data } = await this.$api.Login(values);
      let token = data.token;
      if (status === 200) {
        //  存储token到vuex
        this.updateToken(token);
        // 存储用户信息到vuex
        this.updateUserInfo({
          username: data.username,
          mobile: data.mobile,
        });
        //  存储token 和用户信息 到 cookie
        Cookie.set("token", token);
        // 到首页
        this.$router.push("/");
      }
    },
  },
};
</script>