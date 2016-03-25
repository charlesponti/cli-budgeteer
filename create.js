import Table from 'cli-table'
import {argv} from 'yargs'
import _ from 'lodash'

/**
 * Budget catgories and percentages
 * @type {object}
 */
import {categories} from './budget'

module.exports = function () {
  const monthly = isNaN(parseFloat(argv.monthly)) ? undefined : parseFloat(argv.monthly)
  const yearly = isNaN(parseFloat(argv.yearly)) ? undefined : parseFloat(argv.yearly)

  // Exit process if no income provided
  if (monthly === undefined && yearly === undefined) {
    console.log('Please provide income. Example: node main.js --monthly=3000.00')
    process.exit()
  }

  /**
   * Monthly income
   * @type {Number}
   */
  const income = monthly || yearly

  var budgetTable = new Table({
    head: ['Category', 'Percentage', 'Yearly', 'Monthly'],
    colWidths: [25, 25, 25, 25]
  })

  if (argv.monthly) {
    _.keys(categories).forEach((key) => {
      const value = categories[key].amount
      budgetTable.push([
        key,
        (value * 100) + '%',
        ((income * value) * 12).toFixed(2),
        (income * value).toFixed(2)
      ])
    })
  } else if (argv.yearly) {
    _.keys(categories).forEach((key) => {
      const value = categories[key].amount
      budgetTable.push([
        key,
        (value * 100) + '%',
        (income * value).toFixed(2),
        ((income * value) / 12).toFixed(2)
      ])
    })
  }

  console.log(budgetTable.toString())
}
