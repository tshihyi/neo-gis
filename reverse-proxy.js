const download = require('./download')

const reverseProxy = sourceURL => ({url, path}) => {
  const resourceURL = path.replace('/facility-assets/', sourceURL) +
  '?' + url.split('?')[1]
  return download(resourceURL, {})
}

module.exports = reverseProxy
