//公众号id
module.exports.appid = 'wx8397f8696b538317'

//商户号
module.exports.mch_id = '1473426802'

//商户号中的key
module.exports.key = 'T6m9iK73b0kn9g5v426MKfHQH7X8rKwb'
//微信下单地址
module.exports.orderUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder'

// 微信下单成功后回调地址(要实现这个接口)
module.exports.notify_url = 'http://110.42.199.165:3001/pay/notify';

//  微信订单查询
module.exports.orderquery = 'https://api.mch.weixin.qq.com/pay/orderquery';
  