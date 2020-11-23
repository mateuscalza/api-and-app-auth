const express = require('express')
const authentication = require('../../utils/authentication')

const createPost = require('./createPost')
const listPosts = require('./listPosts')

const router = express.Router()

router.get('/posts', listPosts)
router.post('/posts', authentication, createPost)

module.exports = router
