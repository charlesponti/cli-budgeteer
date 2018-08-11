require('dotenv').config()
const Sequelize = require('sequelize')
const { DB, DB_LOGIN, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env
const { eq } = Sequelize.Op
const { FLOAT, STRING } = Sequelize;

const Conn = new Sequelize(DB, DB_LOGIN, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  operatorsAliases: { $eq: eq }
})

const Account = Conn.define('account', {
  name: { type: STRING, allowNull: false },
  balance: { type: FLOAT }
})

const Category = Conn.define('category', {
  name: { type: STRING, allowNull: false },
  balance: { type: FLOAT, allowNull: false }
})

const Transaction = Conn.define('transaction', {
  amount: { type: FLOAT, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false },
  payee: { type: STRING, allowNull: false },
  description: { type: STRING }
})

const Tag = Conn.define('tag', {
  name: { type: STRING, allowNull: false }
})

// const PersonModel = Conn.define('person', {
//   firstName: { type: STRING, allowNull: false },
//   lastName: { type: STRING, allowNull: false },
//   email: {
//     type: STRING,
//     allowNull: false,
//     validate: { isEmail: true }
//   }
// })

// Relationships
// PersonModel.hasMany(Account)
// PersonModel.hasMany(Transaction)

Account.hasMany(Transaction)

Transaction.hasMany(Category)
Transaction.hasMany(Tag)
// Transaction.belongsTo(PersonModel)
Transaction.belongsTo(Account)

module.exports = {
  Conn,
  // Person,
  Account,
  Transaction,
  Category,
  Tag
}
