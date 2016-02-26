import {argv} from 'yargs'
import {Converter} from 'csvtojson'
import Table from 'cli-table'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import create from './create'

// Create Budget
if (argv.create) {
  create()
}

if (argv.budget) {
  const converter = new Converter({})
  const transactionsByCategory = {}
  const countByCategory = {}
  let table

  // Exit process if no file provided
  if (!argv.file) {
    console.log('Please provide filename. Example: node main.js --file=foo.csv')
    process.exit()
  }

  /**
   * Path to CSV file
   * @type {string}
   */
  const filePath = path.resolve(__dirname, argv.file + '.csv')

  // Exit process if no file found by the name supplied
  if (!fs.existsSync(filePath)) {
    console.log('File ' + filePath + ' not found.')
    process.exit()
  }

  converter.fromFile(filePath, (err, transactions) => {
    if (err) {
      console.log(err)
      process.exit()
    }

    /**
     * Unique list of categories
     * @type {Array}
     */
    const categories = _.unique(
      transactions.map((transaction) => transaction.Category)
    )
    let totalSpend = 0
    let balance = 0
    var columns = ['Category', 'Amount', 'Count', 'Percentage']
    var columnSizes = [25, 25, 25, 25]

    if (argv.income) {
      columns.push('Percentage of Income')
      columnSizes.push(25)
    }

    // instantiate
    table = new Table({
      head: columns,
      colWidths: columnSizes
    })

    categories.forEach((category) => {
      let total = 0
      let count = 0

      var categoryTransactions = (
        transactions.filter((t) => t.Category === category)
      )

      categoryTransactions.forEach((t) => {
        total += parseFloat(t.Amount.replace('£', ''))
        count += 1
      })

      transactionsByCategory[category] = total
      countByCategory[category] = count

      // Do not add payments to total spend
      if (parseFloat(total) > 0) {
        // Add to total spend
        totalSpend += total
      }

      balance += total
    })

    let percentageTotal = 0

    _.keys(transactionsByCategory).forEach((k) => {
      var amount = transactionsByCategory[k]
      let count = countByCategory[k]
      var percentage = ((amount / totalSpend) * 100)
      var percentageOfIncome = ((amount / parseFloat(argv.income)) * 100)

      percentageTotal += percentageOfIncome

      if (argv.income) {
        table.push([
          k,
          amount.toFixed(2),
          count,
          percentage.toFixed(2),
          percentageOfIncome.toFixed(2)
        ])
      } else {
        table.push([
          k,
          amount.toFixed(2),
          count,
          percentage.toFixed(2)
        ])
      }
    })

    console.log(table.toString())

    console.log(`Total Spend: ${totalSpend.toFixed(2)}`)
    console.log(`Balance: ${balance.toFixed(2)}`)
    console.log(percentageTotal)
  })
}
