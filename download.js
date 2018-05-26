const fetch = require('node-fetch')
const {URLSearchParams} = require('url')

const download = (url, parameters) => {
  const data = new URLSearchParams
  Object.entries(parameters).forEach(([k, v]) =>
    data.append(k, v)
  )
  const init = {method: 'POST', body: data}
  return fetch(url, init)
}

module.exports = download
