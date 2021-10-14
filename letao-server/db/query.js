var mysql = require("mysql");
// 创建连接池
var pool = mysql.createPool({
  connectionLimit: 10, // 连接池最大连接数
  host: "localhost", //主机
  user: "root", //用户名
  password: "root", //密码
  database: "letao", //数据库名
});

// 开始连接数据
// 封装sql查询函数
module.exports.query = (sql) => {
  return new Promise((resolve, reject) => {
    // 开始连接数据
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      // Use the connection
      connection.query(sql, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
        resolve(results);
      });
    });
  });
};
