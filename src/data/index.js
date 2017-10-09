const fs = require('fs')
const path = require('path')
const { Converter } = require('csvtojson')
const { addIfDoesntExist, addToTotal } = require('./utils')

/**
 * @namespace transaction
 * @property {string} Account
 * @property {string} Tranfers
 * @property {string} Category
 * @property {string} Payee
 * @property {string} Description
 * @property {number} Amount
 */

/**
 * @namespace Summary
 * @property {number} balance
 * @property {transaction[]} transactions
 * @property {string[]} accounts
 * @property {string[]} categories
 */
let Summary = {

}

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

  const convertToTransactionType = t => ({
    ...t,
    Date: new Date(t.Date)
  })

  const baseState = {
    accounts: [],
    categories: [],
    balance: 0,
    transactions: []
  }

  // Set value of TRANSACTIONS in outer scope and convert items to TransactionType
  Summary = transactions.reduce(function (a, t) {
    t = convertToTransactionType(t)

    return {
      accounts: addIfDoesntExist(a.accounts, t.Account),
      categories: addIfDoesntExist(a.categories, t.Category),
      balance: addToTotal(a.balance, t.Amount),
      transactions: a.transactions.concat(t)
    }
  }, baseState)
})

module.exports = {
  getSummary () {
    return Summary
  },
  getTransactions () {
    return Summary.transactions
  }
}
