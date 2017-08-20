const Category = require('./Category')

describe('Category', function () {
  /**
     * @type {Category}
     */
  var category

  beforeEach(function () {
    category = new Category('foo')
  })

  it('should create new Category', function name () {
    expect(category.total).toEqual(0)
    expect(category.transactions).toEqual({})
    expect(category.name).toEqual('foo')
  })

  describe('.getTransaction', function () {
    it('should add transaction to .transactions', function () {
      var transaction = { id: 'abz', payee: 'Foo', amount: 5 }
      category.addTransaction(transaction)
      expect(category.getTransaction(transaction.id)).toEqual(transaction)
    })
  })

  describe('.addTransaction', function () {
    it('should add transaction to .transactions', function () {
      var transaction = { id: 'abz', payee: 'Foo', amount: 5 }
      category.addTransaction(transaction)
      expect(category.transactions[transaction.id]).toEqual(transaction)
    })
    it('should modify Category balance', function () {
      var transaction = { payee: 'Foo', amount: 5, id: 'abz' }
      category.addTransaction(transaction)
      expect(category.total).toEqual(5)
    })
  })

})
