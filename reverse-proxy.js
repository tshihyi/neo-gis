const download = require('./download')

const reverseProxy = sourceURL => ({path}) => {
  const url = path.replace('/facility-assets/', sourceURL)
  return download(url, {})
}

module.exports = reverseProxy
