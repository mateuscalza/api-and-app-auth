require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const showdown = require('showdown')
const fs = require('fs')
const user = require('./packages/user')
const post = require('./packages/post')

const markdownToHtmlConverter = new showdown.Converter()
const markdown = fs.readFileSync('./readme.md').toString()
const html = markdownToHtmlConverter.makeHtml(markdown)

const app = express()
app.use(bodyParser.json())

// API endpoints
app.use('/api/v1', user)
app.use('/api/v1', post)

// API documentation
app.get('/', (request, response) => response.set('Content-Type', 'text/html').end(html))

app.listen(3000, () => console.info(`http://localhost:3000`))
