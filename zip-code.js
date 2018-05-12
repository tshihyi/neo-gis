const fetch = require('node-fetch')
const {URLSearchParams} = require('url')
const iconv = require('iconv-lite')
const papa = require('papaparse')
const url = 'https://www.land.moi.gov.tw/ngis/chhtml/areadowncsv.asp'

const getZipcode = () => {
  const data = new URLSearchParams
  data.append('R1','1')
  data.append('county1','F')

  const init = {method: 'POST', body: data}

  return fetch(url, init).then(it => it.buffer())
  .then(buffer =>
    iconv.decode(buffer, 'Big5')
  )
}

module.exports = getZipcode
