
var _ = require('lodash');
var budget = require('./budget');
var argv = require('yargs').argv;

var transactionsByCategory = {};

var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var transactions;

var promise = new Promise(function(resolve, reject) {
  //end_parsed will be emitted once parsing finished
  converter.on("end_parsed", function (jsonArray) {
    resolve(jsonArray);
  });
});

//read from file
require("fs").createReadStream("./september.csv").pipe(converter);

promise.then(function(transactions) {
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

    transactionsByCategory[category] = total;

    // Add to total spend
    totalSpend = parseFloat(totalSpend) + parseFloat(total);
  });

  _.keys(transactionsByCategory).forEach(k => {
    console.log(`${k}: ${transactionsByCategory[k].toFixed(2)}`);
  });

  console.log(`Total Spend: ${totalSpend.toFixed(2)}`);
});
