const { TransactionType } = require('../types')

module.exports = {
  type: TransactionType,
  description: 'Retrieve a transaction',
  args: { },
  resolve () {
    return { foo: 'bar' }
  }
}
