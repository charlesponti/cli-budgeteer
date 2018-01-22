const transactions = require('./transactions.json')
const accounts = {}

function addAccountsFromTransaction (transaction) {
  ['to', 'from'].forEach(t => addAccount(transaction[t]))
}

function addAccount (name) {
  if (accounts[name] === void 0) {
    accounts[name] = { balance: 0 }
  }
}

function addTransaction (transaction) {
  accounts[transaction.from].balance -= transaction.amount
  accounts[transaction.to].balance += transaction.amount
}

transactions.forEach(function (transaction) {
  addAccountsFromTransaction(transaction)
  addTransaction(transaction)
})

console.log(accounts)
