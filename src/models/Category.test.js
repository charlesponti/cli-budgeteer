const Category = require('./Category')

describe('Category', function () {
  let category

  beforeEach(function () {
    category = new Category('foo')
  })

  it('should create new Category', function name () {
    expect(category.total).toEqual(0)
    expect(category.transactions).toEqual({})
    expect(category.name).toEqual('foo')
  })
})
