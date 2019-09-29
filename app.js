const express = require('express')
const app = express()
const router = express.Router()
app.use('/public', express.static('public')) 
app.use('/views', express.static('views')) 

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})
app.use('/', require('./routes/web/index'))

// app.use('/api/web_frame', require('./routes/api/it/web_frame'))
app.use('/api/daily_list', require('./routes/api/it/daily_list'))
app.use('/web/daily_list', require('./routes/web/daily_list'))
app.use('/api/daily_info', require('./routes/api/it/daily_info'))
app.use('/web/daily_info', require('./routes/web/daily_info'))
app.use('/api/web_frame', require('./routes/api/it/web_frame'))
app.use('/web/web_frame', require('./routes/web/web_frame'))
app.use('/design_page', require('./routes/web/design_page'))

app.use(router)
app.listen(3001)
console.log('app start success port:3001')
module.exports = app
