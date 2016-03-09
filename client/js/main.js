function Account () {
  this.credit = 0
  this.debit = 0
  this.transactions = []
}

function Transaction (data = {}) {
  this.amount = data['Debit'] || data['Credit']
  this.date = new Date(data.Date)
  this.account = data['Account']
  this.category = data['Category']
}

function Day (data = {}) {
  this.date = data['Day']
  this.netWorth = 0
  this.transactions = []
}

$.get('/api', (data) => {
  window.accounts = {}
  var i = 0

  data.forEach((transaction) => {
    var account = transaction.Account
    var debit = transaction['Debit Amount']
    var credit = transaction['Credit Amount']
    var db = new PouchDB(account)

    if (Object.keys(window.accounts).indexOf(account) === -1) {
      window.accounts[account] = {credit: 0, debit: 0, transactions: []}
    }

    if (typeof transaction['Debit Amount'] === 'number') {
      window.accounts[account].debit += debit
    }

    if (typeof transaction['Credit Amount'] === 'number') {
      window.accounts[account].credit += credit
    }

    transaction._id = i

    i++

    transaction.date = new Date(transaction.Date)

    window.accounts[account].transactions.push(transaction)

    db.put(transaction)
  })

  var accounts = Object.keys(window.accounts)

  var netWorth = 0

  function moneyFormat(number) {
    return numeral(number).format('0,0.00')
  }

  accounts.forEach((account) => {
    var accountName = account + ''
    account = window.accounts[account]
    account.balance = (account.credit - account.debit).toFixed(2)
    netWorth += parseFloat(account.balance)

    var accountEl = $(`
      <div class="col-md-4">
          <h2>${accountName}</h2>
          <h3>Balance: £ ${moneyFormat(account.balance)}</h3>
       </div>
    `)

    $('.container .row').append(accountEl)
  })

  $('#net-worth').text('Net Worth: £ ' + moneyFormat(netWorth.toFixed(2)))

  console.log(window.accounts)
})
