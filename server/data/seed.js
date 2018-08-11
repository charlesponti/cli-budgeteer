/* eslint no-console: 0 */

const { Conn, Account } = require('./index')

const fs = require('fs')
const path = require('path')
const { Converter } = require('csvtojson')
const { addToTotal, addTransactionToObject, objectToArrayWithName } = require('./utils')

const filePath = path.resolve(__dirname, './transactions.csv')

// Exit process if no file found by the name supplied
if (!fs.existsSync(filePath)) {
  process.stdout.write('File ' + filePath + ' not found.')
  process.exit()
}

/**
 * @property {string} name
 * @property {number} balance
 * @property {array} transactions
 */
const ACCOUNTS = {}

const CATEGORIES = {}

const TRANSACTIONS = []

let NET_WORTH = 0

const converter = new Converter({})

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

  // Set value of TRANSACTIONS in outer scope and convert items to TransactionType
  transactions.forEach(function (t) {
    t = convertToTransactionType(t)

    addTransactionToObject(ACCOUNTS, t.Account, t)

    addTransactionToObject(CATEGORIES, t.Category, t)

    TRANSACTIONS.push(t)

    NET_WORTH = addToTotal(NET_WORTH, t.Amount)
    /**
     * When a transaction gets added...
     * 1. Adjust account.balance
     * 2. Add to account.transactions
     * 3. Adjust category.balance
     * 4. Add to category.transactions
     * 5. Adjust net worth
     * 6. Add transaction to master transaction list
     */
  })

  const accounts = objectToArrayWithName(ACCOUNTS)

  Conn
    .sync({ force: true })
    .then(function () {
      return Promise.all(accounts.map(a => (
        Account.create({ name: a.name, balance: a.balance })
      )))
    })
    .then(function (data) {
      console.log()
      console.log('Accounts saved to database.')
      const promises = []

      data.forEach(function (account) {
        accounts
          .find(a => a.name === account.name)
          .transactions
          .map(t => promises.push((
            account.createTransaction({
              payee: t.Payee,
              amount: t.Amount,
              description: t.Description,
              date: t.Date
            })
          )))
      })

      return Promise.all(promises)
    })
    .then(function (data) {
      console.log()
      console.log(`${data.length} transactions added!`)
      process.exit()
    })
    .catch(function (err) {
      console.log()
      console.log(`Error: ${JSON.stringify(err, null, 2)}`)
      process.exit()
    })
})
