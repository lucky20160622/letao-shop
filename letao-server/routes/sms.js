const { sendsms } = require('../utlis')

const router=require('kor-router')()

router.post('/sendsms',sendsms)

module.exports=router