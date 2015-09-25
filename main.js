
var _ = require('lodash');
var transactions = require('./transactions');
var budget = require('./budget');
var argv = require('yargs').argv;

var transactionsByCategory = {};

/**
 * Unique list of categories
 * @type {Array}
 */
var categories = _.unique(transactions.map(transaction => transaction.Category));
var totalSpend = 0;

categories.forEach(category => {
  var total = 0;
  var categoryTransactions = transactions.filter(t => t.Category === category);

  categoryTransactions.forEach(t => {
    total += parseFloat(t['Amount']);
  });

  transactionsByCategory[category] = total.toFixed(2);

  // Add to total spend
  totalSpend = parseFloat(totalSpend) + parseFloat(total.toFixed(2));
});

_.keys(transactionsByCategory).forEach(k => {
  console.log(`${k}: ${transactionsByCategory[k]}`);
});

console.log(`Total Spend: ${totalSpend}`);
