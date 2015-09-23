
var _ = require('lodash');
var transactions = require('./transactions');

/**
 * Unique list of categories
 * @type {Array}
 */
var categories = _.unique(transactions.map(transaction => transaction.Category));
