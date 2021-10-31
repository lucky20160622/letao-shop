<template>
  <div class="my">
    <!-- 表单 -->
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
      <van-field
        v-model="repeatPassword"
        type="password"
        name="repeatPassword"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="mobile"
        type="mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #button>
          <van-button
            type="primary"
            size='small'
            :disabled='isDisabled'
            @click="sendsms"
          >{{SmsBtnText}}</van-button>
        </template>
      </van-field>
      <van-field
        v-model="smscode"
        name="smscode"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
      </van-field>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >注册</van-button>
      </div>
    </van-form>
    <!-- 会员协议 -->
    <van-row
      type="flex"
      justify="left"
    >
      <van-col offset="7">
        <van-checkbox v-model="checked"></van-checkbox>
      </van-col>
      <van-col>《请阅读相关协议》</van-col>
    </van-row>
  </div>
</template>
<script>
import { verify } from "~/utils";
import { Toast } from "vant";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      repeatPassword: "", //确认密码
      mobile: "", //手机号
      smscode: "", //保存用户在页面输入的短信验证码
      checked: true, //复选框状态
      isDisabled: false, //发送短信按钮的可用状态
      SmsBtnText: "发送短信", //发送短信按钮的提示文案
      smscodeServer: "", //保存用户输入的验证码
    };
  },

  methods: {
    ...mapMutations(['updateUserInfo']),
    //1.发送短信
    async sendsms() {
      //校验手机号是否合法
      let msg = verify.mobile(this.mobile);
      if (msg) {
        Toast(msg);
        return;
      }
      //2.禁用发送短信按钮可用状态
      this.isDisabled = true;
      //3.定义一个定时器，如果点击发送短信，则30s后才能再次点击
      let times = 30;
      //4.30s到了则 按钮可用
      this.timerId = setInterval(() => {
        //5.时间递减
        times--;
        this.SmsBtnText = `剩余${times}s`;
        //6.如果30s到了 按钮就可以再次点击了
        if (times == 0) {
          this.isDisabled = false;
          //7.清除定时器
          clearInterval(this.timerId);
          //8.重置发送按钮的提示文案
          this.smsBtnText = "发送短信";
        }
      }, 1000);

      // 调用发送短信接口
      const { data } = await this.$api.SendSmsCode(this.mobile);
      //保存服务端返回的短信验证码
      this.smscodeServer = data;
      console.log(this.smscodeServer);
    },
    //1.value是提交表单中所有的数据
    async onSubmit(values) {
      console.log("submit", values);
      //2.是否勾选协议
      if (!this.checked) Toast("请勾选协议后才能注册");
      //3.表单校验
      const msg =
        verify.username(this.username) ||
        verify.password(this.password, this.repeatPassword) ||
        verify.mobile(this.mobile);
      if (msg) {
        Toast(msg);
        return;
      }
      console.log(msg);
      //4.验证验证码短信
      if (this.smscode !== this.smscodeServer) {
        Toast("验证码有误");
        return;
      }
      //5.调用注册接口
      const { status, userInfo } = await this.$api.Register(values);
      // 是否注册成功
      if (status == 200) {
        // 注册成功把用户的信息 存在vuex中
        // this.$store.commit('updateUserInfo', userInfo);
        this.updateUserInfo(userInfo);
        // 跳转登录页面
        this.$router.push("/my/login");
      }
      console.log(userInfo);
    },
  },
};
</script>