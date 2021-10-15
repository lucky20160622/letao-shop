const { query } = require("../db/query");
//注册用户
module.exports.register = async (username, password, mobile) => {
  //把用户注册的数据添加到数据库中
  return await query(
    `insert into user (username,password,mobile)values("${username}","${password}","${mobile}")`
  );
};

//查询用户
module.exports.findUserByUserName = async (username) => {
  return await query("select * from user where username?", [username]);
};

//登录
module.exports.findUserInfo = async (username, password) => {
  return await query(
    "select * from user where username?and password=?"[(username, password)]
  );
};
