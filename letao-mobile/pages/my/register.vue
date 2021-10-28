<template>
  <div class="my">
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
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      repeatPassword: "", //确认密码
      mobile: "", //手机号
      checked: true, //复选框状态
      isDisabled: false, //发送短信按钮的可用状态
      SmsBtnText: "发送短信", //发送短信按钮的提示文案
    };
  },

  methods: {
    //1.发送短信
    sendsms() {
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
    },
    //value是提交表单中所有的数据
    onSubmit(values) {
      console.log("submit", values);

      //表单校验
      const msg =
        verify.username(this.username) ||
        verify.password(this.password, this.repeatPassword) ||
        verify.mobile(this.mobile);
      if (msg) {
        Toast(msg);
        return;
      }
      console.log(msg);
    },
  },
};
</script>