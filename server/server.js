require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const showdown = require('showdown')
const fs = require('fs')
const user = require('./packages/user')

const markdownToHtmlConverter = new showdown.Converter()
const markdown = fs.readFileSync('./readme.md').toString()
const html = markdownToHtmlConverter.makeHtml(markdown)

const app = express()
app.use(bodyParser.json())
app.use('/api/v1', user)
app.get('/', (request, response) => response.set('Content-Type', 'text/html').end(html))
app.listen(3000, () => console.info(`http://localhost:3000`))
