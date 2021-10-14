const { query } = require("../db/query")

//一级数据分类层
module.exports.oneCategory=async()=>{
  return await query('select * from category')
}