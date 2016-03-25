module.exports = {
  types: [
    {name: 'fixed', amount: 0.50},
    {name: 'flexible', amount: 0.30},
    {name: 'goals', amount: 0.20}
  ],
  categories: {
    'Housing': {amount: 0.30, type: 'fixed'},
    'Savings': {amount: 0.20, type: 'goals'},
    'Debt': {amount: 0.10, type: 'goals'},
    'Entertainment': {amount: 0.10, type: 'flexible'},
    'Shopping': {amount: 0.05, type: 'flexible'},
    'Food': {
      amount: 0.10,
      type: 'fixed',
      includes: [
        'groceries',
        'dining out'
      ]
    },
    'Transportation': {amount: 0.05, type: 'fixed'},
    'Living Expenses': {
      amount: 0.10,
      type: 'fixed',
      includes: [
        'electricity'
      ]
    }
  }
}
