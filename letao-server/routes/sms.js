const { sendsms } = require('../controller/sms')

const router = require('koa-router')()

router.post('/sendsms', sendsms)

module.exports = router