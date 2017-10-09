const fs = require('fs')
const path = require('path')
const { Converter } = require('csvtojson')
const { addToTotal, objectToArrayWithName, addTransactionToObject } = require('./utils')

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
let Summary = {}

/**
 * @property {string} name
 * @property {number} balance
 * @property {array} transactions
 */
const ACCOUNTS = {}

const CATEGORIES = {}

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
    netWorth: 0,
    transactions: []
  }

  // Set value of TRANSACTIONS in outer scope and convert items to TransactionType
  Summary = transactions.reduce(function (a, t) {
    t = convertToTransactionType(t)

    addTransactionToObject(ACCOUNTS, t.Account, t)

    addTransactionToObject(CATEGORIES, t.Category, t)

    /**
     * When a transaction gets added...
     * 1. Adjust account.balance
     * 2. Add to account.transactions
     * 3. Adjust category.balance
     * 4. Add to category.transactions
     * 5. Adjust net worth
     * 6. Add transaction to master transaction list
     */
    return {
      netWorth: addToTotal(a.netWorth, t.Amount),
      transactions: a.transactions.concat(t)
    }
  }, baseState)
})

/**
 *
 *
 * @returns {{ accounts: array, categories: array, netWorth: number, transactions: array }}
 */
function getSummary () {
  return {
    ...Summary,
    accounts: getAccounts(),
    categories: getCategories()
  }
}

function getTransactions () {
  return Summary.transactions
}

function getCategories () {
  return objectToArrayWithName(CATEGORIES)
}

function getAccounts () {
  return objectToArrayWithName(ACCOUNTS)
}

module.exports = {
  getAccounts,
  getCategories,
  getSummary,
  getTransactions
}
