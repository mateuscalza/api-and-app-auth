const express = require('express')
const authentication = require('../../utils/authentication')
const authorization = require('../../utils/authorization')

const createPost = require('./createPost')
const listPosts = require('./listPosts')
const deletePost = require('./deletePost')

const router = express.Router()

router.get('/posts', listPosts)
router.post('/posts', authentication, createPost)
router.delete('/posts/:id', authentication, authorization('admin'), deletePost)

module.exports = router
