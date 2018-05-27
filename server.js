const express = require('express')
const landCode = require('./land-code')
const updateDataEmail = require('./update-data-email')

const addRoute = (app, {method, path, handler}) => {
  app[method](path, (req, res) =>
    Promise.resolve(handler(req))
    .then(result => res.json(result))
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
}]

const start = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.use(express.json())
  routes.forEach(r => addRoute(app, r))

  app.listen(port, () => console.log('Service is running on port ' + port))
}

start()
