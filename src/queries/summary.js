const { SummaryType } = require('../types')
const { getSummary } = require('../data')

module.exports = {
  type: SummaryType,
  args: { },
  resolve: getSummary
}
