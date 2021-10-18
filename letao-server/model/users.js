//1.引入query数据库查询
const { query } = require("../db/query");

//2.注册用户
module.exports.register = async (username, password, mobile) => {
  //把用户注册的数据添加到数据库中
  return await query(
    `insert into user ( username, password, mobile ) values ("${username}", "${password}" , "${mobile}" )`
  );
};

//3.查询用户 根据用户名来查询数据库中有没有这个用户
module.exports.findUserByUserName = async (username) => {
  return await query("select * from user where username = ?", [username]);
};

//4.登录 查找数据库中的用户名以及密码是否匹配
module.exports.findUserInfo = async (username, password) => {
  console.log(username, password)
  return await query(
    'select * from user where username = ?  and password = ?', [username, password]
  );
};
