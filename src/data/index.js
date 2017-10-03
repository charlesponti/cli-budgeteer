const fs = require('fs')
const path = require('path')
const { Converter } = require('csvtojson')

let TRANSACTIONS
let ACCOUNTS
let CATEGORIES

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
    Date: new Date(t.Date),
    Amount: parseFloat(t.Amount)
  })

  /**
   * Add a value to an array if it does not exist yet
   * @param {array} currentValues
   * @param {any} newValue
   * @returns {array}
   */
  const addIfDoesntExist = (currentValues, newValue) => (
    currentValues.indexOf(newValue) === -1 ? [...currentValues, newValue].sort() : currentValues
  )

  const baseState = {
    accounts: [],
    categories: [],
    balance: 0,
    transactions: []
  }

  // Set value of TRANSACTIONS in outer scope and convert items to TransactionType
  TRANSACTIONS = transactions.reduce(function (a, t) {
    t = convertToTransactionType(t)

    return {
      accounts: addIfDoesntExist(a.accounts, t.Account),
      categories: addIfDoesntExist(a.categories, t.Category),
      balance: a.balance + t.Amount,
      transactions: a.transactions.concat(t)
    }
  }, baseState)
})

module.exports = {
  getSummary () {
    return TRANSACTIONS
  },
  getTransactions () {
    return TRANSACTIONS.transactions
  }
}
