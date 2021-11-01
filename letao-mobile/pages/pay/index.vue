<template>
  <div class="pay_home">
    <!-- 已支付 -->
    <div
      v-if="payStatus"
      class="pay"
    >
      <h3>您已支付</h3>
    </div>
    <!-- 未支付 -->
    <div
      v-else
      class="nopay"
    >
      <h3>支付二维码</h3>
      <van-image
        width="100"
        height="100"
        :src="payUrl"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payStatus: false, // 未支付
      payUrl: "", // 微信支付二维码
    };
  },
  async mounted() {
    const { name, price } = this.$route.query;
    // 下单请求参数
    const params = {
      body: name,
      spbill_create_ip: "127.0.0.1",
      total_fee: price,
      trade_type: "NATIVE",
    };
    // 调用下单接口
    const {
      data: {
        return_code,
        result_code,
        return_msg,
        nonce_str,
        out_trade_no,
        payUrl,
      },
    } = await this.$api.Order(params);
    // 下单是否成功
    if (
      return_code[0] == "SUCCESS" &&
      result_code[0] == "SUCCESS" &&
      return_msg[0] == "OK"
    ) {
      // 修改支付二维码
      this.payUrl = payUrl;

      // 定时器轮询调用订单查询接口  判断客户已经支付
      this.timeId = setInterval(async () => {
        const {
          data: { trade_state },
        } = await this.$api.QueryOrder({
          nonce_str,
          out_trade_no,
        });
        // 已支付
        if (trade_state == "SUCCESS") {
          this.payStatus = true;
          //  清除定时器
          clearInterval(this.timeId);
        }
      }, 3000);
    }
  },

  beforeDestroy() {
    clearInterval(this.timeId);
  },
};
</script>


<style scoped>
.pay_home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>