const express = require('express')
const app = express()

module.exports = function () {
  console.log('这里是route config')
  const index = require('../routes/web/index')
  app.use('/', index)
  
}
