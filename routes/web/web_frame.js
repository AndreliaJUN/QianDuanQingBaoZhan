let express = require('express')
let app = express()
let ejs = require('ejs')
const myajax = require('../../utils/fetch')

app.engine('ejs', ejs.__express) // 配置识别ejs模板,也可以配置识别HTML
app.set('view engine', 'ejs') // 设置模板扩展名后缀自动添加
app.set('views', './views/web') // 设置模板路径
app.get('/', function (req, res) {
  myajax
    .get('/api/web_frame', {})
    .then(function (response) {
      res.render('web_frame', {
        data: response['data']
      })
    })
    .catch(function (err) {
      console.log(err)
    })
})

module.exports = app
