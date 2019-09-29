const express = require('express')
const cheerio = require('cheerio')
const app = express()
const request = require('request')
const Iconv = require('iconv-lite')


//抓取前端框架前100名
function list (req, res) {
  let url = 'https://www.awesomes.cn/rank'
  let headers = {
    Connection: 'keep-alive',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
  }
  request(
    {
      url: url,
      encoding: null,
      headers: headers
    },
    function (error, response, body) {
      if (response && response.statusCode === 200) {
        body = Iconv.decode(body, 'utf-8')
        let $ = cheerio.load(body)
        let link = {
          links:[]
        }
        $('.list-item').each(function (i, v) {
          //获取排名
          let index = $(this)
            .find('.scord')
            .text()
            //获取图片
          let thumb = $(this)
            .find('.cover')
            .attr('src')
          let title = $(this)
            .find('h4')
            .text()
          let description = $(this)
            .find('.sdesc')
            .text()
          //  let href =
          //    'https://github.com' +
          //    $(this)
          //      .find('a')
          //      .attr('href')
          let tmp = {
            index: index,//排名
            thumb: thumb,//图标
            title: title,//框架名
            description: description,//框架描述
             //url: href.replace('/repo', '')
          }
          link.links.push(tmp)
          
        })
        res.send({
          code: 200,
          data: link,
          msg: ''
        })
      } else {
        console.log(error)
        res.send({
          code: 404,
          msg: '网络好像有点问题'
        })
      }
    }
  )
}


app.get('/', function (req, res) {
  list(req, res)
})
module.exports = app
