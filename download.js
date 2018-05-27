const fetch = require('node-fetch')
const {URLSearchParams} = require('url')

const createSearchParams = parameters => {
  const data = new URLSearchParams
  Object.entries(parameters).forEach(([k, v]) =>
    data.append(k, v)
  )
  return data
}

const withParameters = (url, parameters) => {
  const merged = new URL(url)
  Object.entries(parameters).forEach(([k, v]) =>
    merged.searchParams.append(k, v)
  )
  console.log(merged.toString())
  return merged
}

const download = (url, {method='get', bodyType, parameters}) => {
  const init = {
    method,
    headers: bodyType ==='json'? {
      'Content-Type': 'application/json'
    }: void 0,
    body:
      bodyType === 'json'? JSON.stringify(parameters):
      method === 'post'? createSearchParams(parameters):
      void 0
  }
  return fetch(
    method !== 'get'? url:
    withParameters(url, parameters),
    init
  )
}

module.exports = download
