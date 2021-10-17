const { sendsms, getRandomByLength } = require("../utils");

module.exports.sendsms = async (ctx) => {
  const { mobile } = ctx.request.body;
  // 短信验证码
  const code = getRandomByLength(6);
  const result = await sendsms(mobile, code);

  console.log(result);

  // 是否发送成功
  if (result.SendStatusSet[0].Code == "Ok") {
    ctx.body = {
      status: 200,
      data: code,
      message: "短信发送成功",
    };
  } else {
    ctx.body = {
      status: 0,
      message: "短信发送失败",
    };
  }   
};

const res = {
  SendStatusSet: [
    {
      SerialNo: "2433:235211736716343048554974949",
      PhoneNumber: "+8613346749495",
      Fee: 1,
      SessionContext: "",
      Code: "Ok",
      Message: "send success",
      IsoCode: "CN",
    },
  ],
  RequestId: "22305a86-95f3-4152-85b5-415a4acec0a2",
}
