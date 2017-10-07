const { filter } = require('lodash')
const { GraphQLList, GraphQLString } = require('graphql')
const { isDate, isAlphanumeric } = require('validator')
const data = require('../data')
const { TransactionType } = require('../types')

module.exports = {
  type: new GraphQLList(TransactionType),
  description: 'Transactions from csv',
  args: {
    Account: { type: GraphQLString },
    from: { type: GraphQLString, description: 'Minimum date' },
    to: { type: GraphQLString, description: 'Maximum date' }
  },
  resolve (root, args) {
    let records = data.getTransactions()

    if (Object.keys(args).length) {
      return filter(
        records,
        obj => {
          const objFitsParams = Object.keys(args).map(arg => {
            const v = args[arg]

            switch (arg) {
              case 'from':
                return isDate(v) ? obj.Date >= new Date(v) : false
              case 'to':
                return isDate(v) ? obj.Date <= new Date(v) : false
              default:
                if (isAlphanumeric(v)) return new RegExp(v).test(obj[arg])
                if (typeof v === 'number') return obj[arg] >= v
                else return true
            }
          })

          return objFitsParams.indexOf(false) === -1
        }
      )
    }

    return records
  }
}
