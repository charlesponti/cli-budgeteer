/**
 * @name Category
 * @param {String} name
 */
function Category (name) {
  this.total = 0
  this.name = name
  this.transactions = {}
}

/**
 * 
 * 
 * @param {any} id
 * @returns {Transaction}
 */
Category.prototype.getTransaction = function (id) {
  return this.transactions[id]
}

/**
 * 
 * 
 * @param {Transaction} transaction
 * @returns {undefined}
 */
Category.prototype.addTransaction = function (transaction) {
  this.transactions[transaction.id] = transaction
  this.total += transaction.amount
}

Category.prototype.removeTransaction = function () {

}

module.exports = Category
