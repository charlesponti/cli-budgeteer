import Budgeteer from '@budgeteer/common'
import {Command, flags} from '@oclif/command'
import Table from 'cli-table'
import _ from 'lodash'

export default class Create extends Command {
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
    const {args, flags} = this.parse(Create)
    const {categories} = Budgeteer

    const monthly = isNaN(parseFloat(args.monthly))
    ? undefined
    : parseFloat(args.monthly)

    const yearly = isNaN(parseFloat(args.yearly))
    ? undefined
    : parseFloat(args.yearly)

    // Exit process if no income provided
    if (monthly === undefined && yearly === undefined) {
      console.log(
        'Please provide income. Example: node main.js --monthly=3000.00'
      )
      process.exit()
    }

    const income = monthly || yearly

    let budgetTable = new Table({
    head: ['Category', 'Percentage', 'Yearly', 'Monthly'],
    colWidths: [25, 25, 25, 25]
  })

    if (args.monthly) {
    _.keys(categories).forEach(key => {
      const value = categories[key].amount
      budgetTable.push([
        key,
        value * 100 + '%',
        (income * value * 12).toFixed(2),
        (income * value).toFixed(2)
      ])
    })
  } else if (args.yearly) {
    _.keys(categories).forEach(key => {
      const value = categories[key].amount
      budgetTable.push([
        key,
        value * 100 + '%',
        (income * value).toFixed(2),
        ((income * value) / 12).toFixed(2)
      ])
    })
  }

    console.log(budgetTable.toString())
  }
}
