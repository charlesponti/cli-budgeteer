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
 * Get transaction from category
 * 
 * @param {String} id
 * @returns {Transaction}
 */
function getTransaction (id) {
  return this.transactions[id]
}

/**
 * Add transaction to category
 * 
 * @param {Transaction} transaction
 * @returns {undefined}
 */
function addTransaction (transaction) {
  this.transactions[transaction.id] = transaction
  this.total += transaction.amount
}

/**
 * Remove transaction from category
 * 
 * @param {{ id: String, amount: Number }} Transaction to remove from category
 */
function removeTransaction ({ id, amount }) {
  // Remove transaction from category
  delete this.transactions[id]

  // Adjust total
  this.total -= amount
}

Category.prototype.getTransaction = getTransaction
Category.prototype.addTransaction = addTransaction
Category.prototype.removeTransaction = removeTransaction

module.exports = Category
