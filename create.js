import Table from 'cli-table'
import {argv} from 'yargs'
import _ from 'lodash'

/**
 * Budget catgories and percentages
 * @type {object}
 */
import budget from './budget'

module.exports = function () {
  // Exit process if no income provided
  if (!argv.income) {
    console.log('Please provide monthly income. Example: node main.js --income=3000.00')
    process.exit()
  }

  /**
   * Monthly income
   * @type {Number}
   */
  const income = parseFloat(argv.income)

  var budgetTable = new Table({
    head: ['Category', 'Percentage', 'Amount'],
    colWidths: [25, 25, 25]
  })

  var selectedBudget = argv.create === 'one' ? budget.one : budget.basic

  _.keys(selectedBudget).forEach((key) => {
    const value = selectedBudget[key]
    budgetTable.push([
      key,
      (value * 100) + '%',
      (income * value).toFixed(2)
    ])
  })

  console.log(budgetTable.toString())
}
