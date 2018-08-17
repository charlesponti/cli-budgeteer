import {Command, flags} from '@oclif/command'

export default class Budget extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Budget)

    const converter = new Converter({})
    const transactionsByCategory = {}
    const countByCategory = {}
    let table

  // Exit process if no file provided
    if (!argv.file) {
    console.log(
      'Please provide filename. Example: node main.js --file=foo.csv'
    )
    process.exit()
  }

  /**
   * Path to CSV file
   * @type {string}
   */
    const filePath = path.resolve(process.cwd(), argv.file + '.csv')

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
    const categories = {}
    let totalSpend = 0
    let balance = 0
    let columns = ['Category', 'Amount', 'Count', 'Percentage']
    let columnSizes = [25, 25, 25, 25]

    if (argv.income) {
      columns.push('Percentage of Income')
      columnSizes.push(25)
    }

    // instantiate
    table = new Table({
      head: columns,
      colWidths: columnSizes
    })

    for (let i = 0; i < transactions.length; i++) {
      if (categories[transactions[i].Category] === void 0) {
        categories[transactions[i].Category] = {
          total: parseFloat(transactions[i].Amount),
          transactions: [transactions[i]]
        }
      } else {
        categories[transactions[i].Category].transactions.push([
          transactions[i]
        ])
        categories[transactions[i].Category].amount += parseFloat(
          transactions[i].Amount
        )
      }
    }

    Object.keys(categories)
      .sort()
      .forEach(category => {
        let total = 0
        let count = 0

        let categoryTransactions = transactions.filter(
          t => t.Category === category
        )

        categoryTransactions.forEach(t => {
          total += parseFloat(t.Amount)
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

    _.keys(transactionsByCategory).forEach(k => {
      let amount = transactionsByCategory[k]
      let count = countByCategory[k]
      let percentage = (amount / totalSpend) * 100
      let percentageOfIncome = (amount / parseFloat(argv.income)) * 100

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
        table.push([k, amount.toFixed(2), count, percentage.toFixed(2)])
      }
    })

    console.log(table.toString())
    console.log(`Total Spend: ${totalSpend.toFixed(2)}`)
    console.log(`Balance: ${balance.toFixed(2)}`)
    console.log(`${percentageTotal}`)
  })
  }
}
