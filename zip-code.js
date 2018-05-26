const download = require('./download')
const iconv = require('iconv-lite')
const url = 'https://www.land.moi.gov.tw/ngis/chhtml/areadowncsv.asp'

const getZipcode = () => {
  const parameters = {'R1': '1', 'county1': 'F'}
  return download(url, parameters).then(it => it.buffer())
  .then(buffer =>
    iconv.decode(buffer, 'Big5')
  )
}

module.exports = getZipcode
