const jwt = require('express-jwt')

module.exports = jwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
