
var _ = require('lodash');
var budget = require('./budget');
var argv = require('yargs').argv;
var Table = require('cli-table');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var transactionsByCategory = {};
var transactions;
var table;
var file = argv.file;

if (!file) {
  return;
}

var promise = new Promise(function(resolve, reject) {
  //end_parsed will be emitted once parsing finished
  converter.on("end_parsed", function (jsonArray) {
    resolve(jsonArray);
  });
});

//read from file
require("fs").createReadStream(`./${file}`).pipe(converter);

promise.then(function(transactions) {
  /**
   * Unique list of categories
   * @type {Array}
   */
  var categories = _.unique(transactions.map(transaction => transaction.Category));
  var totalSpend = 0;

  // instantiate
  table = new Table({
      head: ['Category', 'Amount', 'Percentage']
    , colWidths: [25, 25, 25]
  });

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
    var amount = transactionsByCategory[k]
    var percentage = ((amount/totalSpend) * 100).toFixed(2);
    table.push([k, amount.toFixed(2), percentage]);
    // console.log(`${k}: ${amount.toFixed(2)}  ${percentage}%`);
  });

  console.log(table.toString());

  console.log(`Total Spend: ${totalSpend.toFixed(2)}`);
});
