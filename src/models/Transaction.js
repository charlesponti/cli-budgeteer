/**
 * @typedef transaction
 * @property {number} amount - Cost of transaction
 * @property {string} payee - Person/business to which transaction was to
 * @property {string} date - Date on which transaction occurred
 * @property {string} description - Description of transaction (what was purchases, etc.)
 * @property {string} category - Category to which transaction belogs
 * @property {string} account - Account to which transaction is attributed
 * @property {string} transferAccount - Account from which transaction originated
 */

/**
 * @name Transaction
 * @param {transaction} p
 * @returns {Transaction}
 */
function Transaction (p) {
  /**
   * Cost of transaction
   * @type {Number}
   */
  this.amount = p.amount

  /**
   * Person/business to which transaction was to
   * @type {String}
   */
  this.payee = p.payee

  /**
   * Date on which transaction occurred
   * @type {string} date
   */
  this.date = new Date(p.date)

  /**
   * Description of transaction (what was purchases, etc.)
   * @type {string} date
   */
  this.description = p.description

  /**
   * Category to which transaction belogs
   * @type {string}
   */
  this.category = p.category

  /**
   * Account to which transaction is attributed
   * @type {string}
   */
  this.account = p.account

  /**
   * Account from which transaction originated
   * @type {string}
   */
  this.transferAccount = p.transferAccount

  return this
}

module.exports = Transaction
