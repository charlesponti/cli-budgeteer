
$.get('/api', (data) => {
  window.accounts = {}

  data.forEach((transaction) => {
    var account = transaction.Account
    var debit = transaction['Debit Amount']
    var credit = transaction['Credit Amount']

    if (Object.keys(window.accounts).indexOf(account) === -1) {
      window.accounts[account] = {credit: 0, debit: 0, transactions: []}
    }

    if (typeof transaction['Debit Amount'] === 'number') {
      window.accounts[account].debit += debit
    }

    if (typeof transaction['Credit Amount'] === 'number') {
      window.accounts[account].credit += credit
    }

    transaction.date = new Date(transaction.Date)

    window.accounts[account].transactions.push(transaction)
  })

  var accounts = Object.keys(window.accounts)

  accounts.forEach((account) => {
    account = window.accounts[account]
    account.total = account.credit - account.debit
  })

  console.log(window.accounts)
})
