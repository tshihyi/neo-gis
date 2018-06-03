const cors = require('cors')
const express = require('express')
const {entriesToObject} = require('./utils')
const reverseProxy = require('./reverse-proxy')
const landCode = require('./land-code')
const updateDataEmail = require('./update-data-email')

const sendResult = {
  json: (res, result) => res.json(result),
  pass: (res, result) => {

    result.buffer().then(it => {
      res.set(Object.assign(entriesToObject(result.headers), {
        'Content-Encoding': '',
        'Content-Length': it.length
      }))

      res.end(it)
    })
  }
}

const addRoute = (app, {method='get', resultType='json', path, handler}) => {
  app[method](path, (req, res) =>
    Promise.resolve(handler(req))
    .then(result => sendResult[resultType](res, result))
  )
}

const routes = [{
  method: 'get',
  path: '/land-code',
  handler: landCode
}, {
  method: 'post',
  path: '/update-data-email',
  description: `
自動自政府官網下載各種資料，並自動發送e-mail給該專案負責工程師。工程師依此檔更新DB資料。
下載網址、收件人、寄件人帳號、寄件人密碼、主旨、附件檔名
  `,
  handler: updateDataEmail
}, {
  path: '/facility-assets/*',
  description: 'Reverse proxy to http://118.163.241.213:82/',
  resultType: 'pass',
  handler: reverseProxy('http://118.163.241.213:82/')
}]

const start = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.use(express.json())
  app.use(cors({origin: true}))
  routes.forEach(r => addRoute(app, r))

  app.listen(port, () => console.log('Service is running on port ' + port))
}

start()
