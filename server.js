import fs from 'fs'
import path from 'path'
import express from 'express'
import {Converter} from 'csvtojson'
import {argv} from 'yargs'
let TRANSACTIONS

const app = express()
const converter = new Converter({})
const filePath = path.resolve(__dirname, argv.file + '.csv')

// Exit process if no file found by the name supplied
if (!fs.existsSync(filePath)) {
  console.log('File ' + filePath + ' not found.')
  process.exit()
}

app.use(express.static(__dirname + '/client'))
app.set('views', __dirname + '/client')
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use('/api', (req, res, next) => {
  res.json(TRANSACTIONS)
})

app.use('*', (req, res, next) => res.render('index.html'))

converter.fromFile(filePath, (err, transactions) => {
  TRANSACTIONS = transactions

  app.listen(3000)
})

