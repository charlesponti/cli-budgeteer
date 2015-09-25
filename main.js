
var _ = require('lodash');
var transactions = require('./transactions');
var budget = require('./budget');

var transactionsByCategory = {};

/**
 * Unique list of categories
 * @type {Array}
 */
var categories = _.unique(transactions.map(transaction => transaction.Category));

categories.forEach(category => {
  var categoryTransactions = transactions.filter(t => t.Category === category);

  transactionsByCategory[category] = categoryTransactions.reduce((prev, curr, i, arr) => {
    return prev + parseInt(arr[i]['Amount']);
  });
});

console.log(transactionsByCategory);
