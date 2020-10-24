const Sequelize = require("sequelize");
const logger = require("../logger");
const { DB, DB_LOGIN, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const { FLOAT, STRING, BOOLEAN } = Sequelize;

const Conn = new Sequelize(DB, DB_LOGIN, DB_PASSWORD, {
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT ? DB_PORT : "5432",
  logging: msg => logger.log("info", msg)
});

const Account = Conn.define("account", {
  name: { type: STRING, allowNull: false },
  balance: { type: FLOAT }
});

const Category = Conn.define("category", {
  name: { type: STRING, allowNull: false },
  balance: { type: FLOAT, allowNull: false }
});

const Transaction = Conn.define("transaction", {
  amount: { type: FLOAT, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false },
  processed: { type: Sequelize.DATE, allowNull: true },
  payee: { type: STRING, allowNull: false },
  description: { type: STRING },
  category: { type: STRING },
  shared: { type: BOOLEAN },
  foreign_spend_amount: { type: STRING },
  non_sterling_transaction_fee: { type: STRING },
  exchange_rate: { type: STRING }
});

const Tag = Conn.define("tag", {
  name: { type: STRING, allowNull: false }
});

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

Account.hasMany(Transaction, { foreignKey: "account_id" });
Transaction.belongsTo(Account, { foreignKey: "account_id" });

Transaction.hasMany(Category);
Transaction.hasMany(Tag);

module.exports = {
  Conn,
  // Person,
  Account,
  Transaction,
  Category,
  Tag
};
