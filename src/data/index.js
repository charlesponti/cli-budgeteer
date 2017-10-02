const fs = require('fs')
const path = require('path')
const { Converter } = require('csvtojson')

let TRANSACTIONS
const converter = new Converter({})
const filePath = path.resolve(__dirname, './transactions.csv')

// Exit process if no file found by the name supplied
if (!fs.existsSync(filePath)) {
  process.stdout.write('File ' + filePath + ' not found.')
  process.exit()
}

/**
 * Load CSV file before starting application so that the data is ready
 */
converter.fromFile(filePath, (err, transactions) => {
  if (err) {
    // Write error to console
    process.stdout.write(err)
  }

  // Set value of TRANSACTIONS in outer scope and convert items to TransactionType
  TRANSACTIONS = transactions.map(function convertToTransactionType (t) {
    return {
      ...t,
      Date: new Date(t.Date),
      Amount: parseFloat(t.Amount)
    }
  })
})

module.exports = {
  getTransactions () {
    return TRANSACTIONS
  }
}
