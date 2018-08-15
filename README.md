# Budgeteer

This is a tool which creates a GraphQL API and command-line interface for interacting with
one's financial history in the form of transactions.

## Transactions

Transactions are in the form of:

| Key | Description |
|------------------|--------------------------------------------------------|
| Date             | When the transaction occurred |
| Amount           | How much transaction cost |
| Account          | Account which transaction occurred on |
| Transfer Account | Account which money is coming from if transaction is a transfer |
| Payee            | Individual, business, account, etc. the payment is for |
| Description      | Additional information about the transaction |
| Tags             | hashtags which allow the user to do more in depth and custom querying |

## To Do

- [x] GraphQL API
- [ ] Responsive Images
- [ ] Responsive Images of maps
- [ ] Server-side Graph Rendering
