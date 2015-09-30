
var _ = require('lodash');
var fs = require('fs');
var argv = require('yargs').argv;
var Table = require('cli-table');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var transactionsByCategory = {};
var transactions;
var table;

/**
 * Budget catgories and percentages
 * @type {object}
 */
var budget = require('./budget');

// Exit process if no file provided
if (!argv.file) {
  console.log('Please provide filename. Example: node main.js --file=foo.csv');
  process.exit();
}

// Exit process if no income provided
if (!argv.income) {
  console.log('Please provide monthly income. Example: node main.js --income=3000.00');
  process.exit();
}

/**
 * Path to CSV file
 * @type {string}
 */
var file = argv.file;

/**
 * Monthly income
 * @type {Number}
 */
var income = parseFloat(argv.income);

var promise = new Promise(function(resolve, reject) {
  //end_parsed will be emitted once parsing finished
  converter.on("end_parsed", function (jsonArray) {
    resolve(jsonArray);
  });
});

//read from file
fs.createReadStream(`./${file}`).pipe(converter);

promise.then(function(transactions) {
  /**
   * Unique list of categories
   * @type {Array}
   */
  var categories = _.unique(transactions.map(transaction => transaction.Category));
  var totalSpend = 0;

  // instantiate
  table = new Table({
      head: ['Category', 'Amount', 'Percentage', 'Percentage of Income']
    , colWidths: [25, 25, 25, 25]
// Create Budget
if (argv.create) {
  promise.then(function() {
    var budgetTable = new Table({
      head: ['Category', 'Percentage', 'Amount'],
      colWidths: [25,25,25]
    });

    var selectedBudget = argv.create === 'one' ? budget.one : budget.basic;

    _.keys(selectedBudget).forEach(function(key) {
      var value = selectedBudget[key];
      budgetTable.push([key, value.toFixed(2), (income * value).toFixed(2)])
    });

    console.log(budgetTable.toString());
  });
}

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
    var amount = transactionsByCategory[k];
    var percentage = ((amount/totalSpend) * 100).toFixed(2);
    var percentageOfIncome = ((amount/income) * 100).toFixed(2);
    table.push([k, amount.toFixed(2), percentage, percentageOfIncome]);
  });

  console.log(table.toString());

  console.log(`Total Spend: ${totalSpend.toFixed(2)}`);
});
