const sendEmail = require('gmail-send')()
const download = require('./download')
const url = 'https://www.land.moi.gov.tw/ngis/chhtml/areadowncsv.asp'
const parameters = {'R1': '1', 'county1': 'F'}

const options = {
  user: 'shelly.tu@linkchain.tw',
  pass: 'qpqehbprojczzfbo',
  subject: 'Hello dk',
  text:    'gmail-send example 1',         // Plain text
  to: [
    'dk@csie.org'
  ]
}

const updateDataEmail = req =>
download(url, parameters)

module.exports = updateDataEmail
