const Category = require('./Category')

describe('Category', function () {
  it('should create new Category', function name () {
    const c = new Category('foo')
    expect(c.total).toEqual(0)
    expect(c.transactions).toEqual([])
    expect(c.name).toEqual('foo')
  })
})
