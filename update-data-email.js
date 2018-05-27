const sendEmail = require('gmail-send')()
const download = require('./download')

const fs = require('fs')

const saveFile = name => content => {
  fs.writeFileSync(name, content)
  return name
}

const downloadSave = ({url, parameters, name}) =>
download(url, {method: 'post', parameters}).then(it => it.buffer())
.then(saveFile(name))

const mailAndLog = options => {
  console.log(options)
  sendEmail(options)
}

const downloadFiles = ({files, mailOptions}) =>
Promise.all(files.map(downloadSave))
.then(files =>
  Object.assign({}, mailOptions, {
    files: files.map(path => ({path}))
  })
)

const updateDataEmail = req =>
downloadFiles(req.body).then(mailAndLog)

module.exports = updateDataEmail
