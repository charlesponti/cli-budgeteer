
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

/**
 * Monthly income
 * @type {Number}
 */
var income = parseFloat(argv.income);

// Create Budget
if (argv.create) {
  create()
}

if (argv.budget) {
  // Exit process if no file provided
  if (!argv.file) {
    console.log('Please provide filename. Example: node main.js --file=foo.csv');
    process.exit();
  }

  /**
   * Path to CSV file
   * @type {string}
   */
  var file = argv.file;

  // Promise to be resolved after CSV file is parsed
  var promise = new Promise(function(resolve, reject) {
    converter.on("end_parsed", function (jsonArray) {
      resolve(jsonArray);
    });
  });

  // Convert CSV file
  fs.createReadStream(`./${file}`).pipe(converter);

  promise.then(function(transactions) {
    /**
     * Unique list of categories
     * @type {Array}
     */
    var categories = _.unique(transactions.map(transaction => transaction.Category));
    var totalSpend = 0;
    var columns = ['Category', 'Amount', 'Percentage'];
    var columnSizes = [25,25,25];

    if (argv.income) {
      columns.push('Percentage of Income');
      columnSizes.push(25);
    }

    // instantiate
    table = new Table({
      head: columns,
      colWidths: columnSizes
    });

    categories.forEach(category => {
      var total = 0;
      var categoryTransactions = transactions.filter(t => t.Category === category);

      categoryTransactions.forEach(t => {
        total += parseFloat(t.Amount);
      });

      transactionsByCategory[category] = total;

      // Add to total spend
      totalSpend = parseFloat(totalSpend) + parseFloat(total);
    });

    _.keys(transactionsByCategory).forEach(k => {
      var amount = transactionsByCategory[k];
      var percentage = ((amount/totalSpend) * 100).toFixed(2);

      if (argv.income) {
        var percentageOfIncome = ((amount/totalSpend) * 100).toFixed(2);
        table.push([k, amount.toFixed(2), percentage, percentageOfIncome]);
      }
      else {
        table.push([k, amount.toFixed(2), percentage]);
      }
    });

    console.log(table.toString());

    console.log(`Total Spend: ${totalSpend.toFixed(2)}`);
  });
}
