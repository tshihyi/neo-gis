const convert = require('./convert')
const getZipcode = require('./zip-code')
const landCode = req => getZipcode().then(convert)

module.exports = landCode
