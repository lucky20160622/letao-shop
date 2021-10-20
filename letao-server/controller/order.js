const { createSign, outTradeNo, getRandomStr, createOrder } = require("../utils/index")
const { orderUrl, appid, mch_id, notify_url } = require('../config/wx')
const QRCode = require('qrcode');
module.exports.order = async (ctx) => {
  let { body, total_fee, spbill_create_ip, trade_type } = ctx.request.body;
  trade_type = "NATIVE"
  const params = {
        appid,  
        mch_id,  // 商户号
        nonce_str: getRandomStr(), // 32位以内的随机字符串
        // sign, // 签名
        body, // 商品描述
        out_trade_no:outTradeNo(), // 商户订单号
        total_fee, // 金额
        spbill_create_ip,  // 终端ip
        notify_url, // 微信服务器回调的地址
        trade_type,  // 支付类型
    }
  //生成签名，需要发送的参数生成
  const sign = createSign(params)
  //给params添加一个新的属性
  params.sign = sign

  const sendData = `
  <xml>
  <appid>${appid}</appid>
  <body>${body}</body>
  <mch_id>${mch_id}</mch_id>
  <nonce_str>${params.nonce_str}</nonce_str>
  <notify_url>${notify_url}</notify_url>
  <out_trade_no>${params.out_trade_no}</out_trade_no>
  <spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
  <total_fee>${total_fee}</total_fee>
  <trade_type>${trade_type}</trade_type>
  <sign>${sign}</sign>
</xml>
  `
  const data = await createOrder(orderUrl, sendData)

  // 下单成功
  const { return_code, return_msg, result_code, code_url } = data;
  if (return_code == 'SUCCESS' && return_msg == 'OK' && result_code == "SUCCESS") {
    data.payUrl = await QRCode.toDataURL(code_url)
  }

  ctx.body = {
    status: 200,
    data
  }
}
