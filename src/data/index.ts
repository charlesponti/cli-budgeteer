import * as Sequelize from 'sequelize';
import logger from '../logger';
const {DATABASE_URL = ''} = process.env;
const {FLOAT, STRING, BOOLEAN} = Sequelize;

export const sequelize = new Sequelize.Sequelize(DATABASE_URL, {
  logging: (msg: string) => logger.log('info', `🎒 ${msg}`),
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('✅ Connected to PostgreSQL 🎒');
  })
  .catch(e => {
    logger.info(`🛑 Unable to connect to PostgreSQL 🎒... \n ${e}`);
  });

export const Account = sequelize.define('account', {
  name: {type: STRING, allowNull: false},
  balance: {type: FLOAT},
});

export const Category = sequelize.define('category', {
  name: {type: STRING, allowNull: false},
  balance: {type: FLOAT, allowNull: false},
});

export const Transaction = sequelize.define('transaction', {
  amount: {type: FLOAT, allowNull: false},
  date: {type: Sequelize.DATE, allowNull: false},
  processed: {type: Sequelize.DATE, allowNull: true},
  payee: {type: STRING, allowNull: false},
  description: {type: STRING},
  category: {type: STRING},
  shared: {type: BOOLEAN},
  foreign_spend_amount: {type: STRING},
  non_sterling_transaction_fee: {type: STRING},
  exchange_rate: {type: STRING},
});

export const Tag = sequelize.define('tag', {
  name: {type: STRING, allowNull: false},
});

export const Person = sequelize.define('person', {
  firstName: {type: STRING, allowNull: false},
  lastName: {type: STRING, allowNull: false},
  email: {
    type: STRING,
    allowNull: false,
    validate: {isEmail: true},
  },
});

// Relationships
Person.hasMany(Account, {foreignKey: 'person_id'});
Person.hasMany(Transaction, {foreignKey: 'person_id'});

Account.hasMany(Transaction, {foreignKey: 'account_id'});
Transaction.belongsTo(Account, {foreignKey: 'account_id'});

Transaction.hasMany(Category);
Transaction.hasMany(Tag);
