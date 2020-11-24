const express = require('express')
const auth = require('./auth')

const router = express.Router()

router.post('/users/auth', auth)

module.exports = router
