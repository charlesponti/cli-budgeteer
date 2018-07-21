const { Transaction } = require('../data')
const { SummaryType } = require('../types')

module.exports = {
  type: SummaryType,
  args: { },
  resolve (root, args) {
    return (
      Transaction
        .sum('amount')
        .then(function (data) {
          return { netWorth: data }
        })
    )
  }
}
