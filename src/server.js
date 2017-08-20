import fs from 'fs'
import path from 'path'
import express from 'express'
import {Converter} from 'csvtojson'
import {argv} from 'yargs'

let TRANSACTIONS

const app = express()
const converter = new Converter({})
const filePath = path.resolve(__dirname, argv.file + '.csv')
const clientPath = path.resolve(__dirname, './client')

// Exit process if no file found by the name supplied
if (!fs.existsSync(filePath)) {
  process.stdout.write('File ' + filePath + ' not found.')
  process.exit()
}

app.use(express.static(clientPath))
app.set('views', clientPath)
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use('/api', (req, res, next) => {
  res.json(TRANSACTIONS)
})

app.use('*', (req, res, next) => res.render('index.html'))

/**
 * Load CSV file before starting application so that the data
 * is ready
 */
converter.fromFile(filePath, (err, transactions) => {
  if (err) {
    // Write error to console
    process.stdout.write(err)
  }

  // Set value of TRANSACTIONS in outer scope
  TRANSACTIONS = transactions

  // Start application
  app.listen(3000)
})
