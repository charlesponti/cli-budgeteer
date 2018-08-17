import {Command, flags} from '@oclif/command'
import fs = require('fs')
import moment = require('moment')
import os = require('os')
import path = require('path')
import {isString} from 'util'
import xlsx = require('xlsx')

export default class Hello extends Command {
  static description = 'Convert an American Express `Summary.xls` to a `.csv`'

  static examples = [
    '$ budgeteer-cli amex-convert --file ~/downloads/Summary.xlsx'
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({
      char: 'f',
      description: 'American Express `Summary.xls` to convert',
      required: true
    }),
  }

  static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Hello)
    const filePath = path.resolve(flags.file.replace('~', os.homedir()))
    const directory = (
      filePath
        .split('/')
        .map((item, index) => index !== filePath.split('/').length - 1 ? item : '')
        .join('/')
    )
    const workbook = xlsx.readFile(filePath)
    const worksheet = workbook.Sheets.Summary

    let sheet2arr = function (sheet: xlsx.WorkSheet) {
      let result = []
      let row
      let rowNum
      let colNum
      let range = xlsx.utils.decode_range(sheet['!ref'] || '')
      let transactionsStartRow = 0
      let startSaving = false
      const lineBreakCheck = /(\r\n|\r|\n)/g

      for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        row = []

        for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
          let nextCell = sheet[xlsx.utils.encode_cell({r: rowNum, c: colNum})]

          if (startSaving === false) {
            startSaving = nextCell ? nextCell.w === 'Date' : false
          }

          if (startSaving) {
            let {w: value} = nextCell || {w: ''}

            if (value === 'Date') {
              transactionsStartRow = rowNum + 1
            }

            if (rowNum >= transactionsStartRow) {
              switch (colNum) {
                // The first column is `Date`
                case 0:
                // The second column is `Date Processed`
                case 1:
                  value = moment(new Date(value)).format('YYYY-MM-DD')
                  break
                // The fourth column is `Amount`
                case 3:
                  value = -(nextCell.w.replace('£', '').replace(',', ''))
                  break
                default:
                  value = isString(value) ? value.replace(lineBreakCheck, '   -   ') : value
              }
            }

            row.push(value)
          }
        }

        if (startSaving) result.push(row.join(','))
      }

      return result
    }

    const savePath = path.join(directory, 'summary.csv')

    fs.writeFileSync(savePath, sheet2arr(worksheet).join('\n'))

    this.log(`File saved to ${savePath}`)
  }
}
