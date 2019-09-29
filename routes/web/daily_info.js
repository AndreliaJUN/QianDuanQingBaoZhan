'use strict'
let express = require('express')
let app = express()
let ejs = require('ejs')
const myajax = require('../../utils/fetch')

app.engine('ejs', ejs.__express) // 配置识别ejs模板
app.set('view engine', 'ejs') // 设置模板扩展名后缀自动添加
app.set('views', './views/web') // 设置模板路径
app.get('/:date', function (req, res) {
  let date = parseInt(req.params.date)
  myajax
    .get('/api/daily_info/' + date, {})
    .then(function (response) {
      res.render('daily_info', {
        title: 'blog',
        data: response['data']
      })
    })
    .catch(function (err) {
      console.log(err)
    })
})

module.exports = app
