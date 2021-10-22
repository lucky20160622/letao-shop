//引入utils中封装的参数方法
const { createSign, outTradeNo, getRandomStr, createOrder } = require("../utils/index")
//引入wx中的参数方法
const { orderUrl, appid, mch_id, notify_url } = require('../config/wx')
const { query } = require('../db/query')
const QRCode = require('qrcode');
//微信下单
module.exports.order = async (ctx) => {
  let { body, total_fee, spbill_create_ip, trade_type } = ctx.request.body;
  trade_type = "NATIVE"
  const params = {
    appid,  //公众号id
    mch_id,  // 商户号
    nonce_str: getRandomStr(), // 32位以内的随机字符串
    // sign, // 签名
    body, // 商品描述
    out_trade_no: outTradeNo(), // 商户订单号
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
  //把参数传给controller/order中的carteOrder方法
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

//微信下单回调通知
module.exports.notify = async () => {
  console.log(ctx.request.body);
  const { appid, bank_type, cash_fee, fee_type, is_subscribe, mch_id, nonce_str, openid, out_trade_no, sign, time_end, total_fee, trade_type, transaction_id } = ctx.request.body.xml;

  const result = await query(`insert into payorder(appid, bank_type,cash_fee,fee_type,is_subscribe,mch_id,nonce_str,openid,out_trade_no,sign,time_end,total_fee,trade_type,transaction_id) values('${appid}','${bank_type}','${cash_fee}','${fee_type}','${is_subscribe}','${mch_id}','${nonce_str}','${openid}','${out_trade_no}','${sign}','${time_end}','${total_fee}','${trade_type}','${transaction_id}')`);
  // 响应微信服务器接口，订单处理成功，无需重复通知
  ctx.body = `<xml>
  <return_code><![CDATA[SUCCESS]]></return_code>
  <return_msg><![CDATA[OK]]></return_msg>
</xml>`
}


//微信订单查询
module.exports.queryOrder = async (ctx) => {
  let params = {
    appid,
    mch_id,
    nonce_str,//32以内的随机字符串
    out_trade_no
  }
  //生成签名
  let sign = createSign(params)
  let sendData = `
  <xml>
       <appid>${appid}</appid>
       <mch_id>${mch_id}</mch_id>
       <nonce_str>${nonce_str}</nonce_str>
       <out_trade_no>${out_trade_no}</out_trade_no>
       <sign>${sign}</sign>
  </xml>
`
  const data = await queryOrder(orderquery, sendData);
  ctx.body = {
    status: 200,
    data
  }
}