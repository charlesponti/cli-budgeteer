require('dotenv').config()
const Sequelize = require('sequelize')

const Conn = new Sequelize(
  'relay',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost',
    operatorsAliases: false
  }
)

const Account = Conn.define('account', {
  name: { type: Sequelize.STRING, allowNull: false },
  balance: { type: Sequelize.FLOAT }
})

const Category = Conn.define('category', {
  name: { type: Sequelize.STRING, allowNull: false },
  balance: { type: Sequelize.FLOAT, allowNull: false }
})

const Transaction = Conn.define('transaction', {
  amount: { type: Sequelize.FLOAT, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false },
  payee: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING }
})

const Tag = Conn.define('tag', {
  name: { type: Sequelize.STRING, allowNull: false }
})

const PersonModel = Conn.define('person', {
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  }
})

// Relationships
PersonModel.hasMany(Account)
PersonModel.hasMany(Transaction)

Account.hasMany(Transaction)

Transaction.hasMany(Category)
Transaction.hasMany(Tag)
Transaction.belongsTo(PersonModel)
Transaction.belongsTo(Account)

module.exports = {
  Conn,
  // Person,
  Account,
  Transaction,
  Category,
  Tag
}
