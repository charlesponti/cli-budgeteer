# Budgeteer

This is a tool which creates a GraphQL API and command-line interface for interacting with
one's financial history in the form of transactions.

## Transactions
Transactions are in the form of:
<style>
  table tr td:first-child {
    font-weight: 600
  }
</style>
<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Date</td>
      <td>When the transaction occurred</td>
    </tr>
    <tr>
      <td>Amount</td>
      <td>How much transaction cost</td>
    </tr>
    <tr>
      <td>Account</td>
      <td>Account which transaction occurred on</td>
    </tr>
    <tr>
      <td>Transfer Account</td>
      <td>Account which money is coming from if transaction is a transfer</td>
    </tr>
    <tr>
      <td>Payee</td>
      <td>Individual, business, account, etc. the payment is for</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>Additional information about the transaction</td>
    </tr>
    <tr>
      <td>Tags</td>
      <td>hashtags which allow the user to do more in depth and custom querying</td>
    </tr>
  </body>
</table>

## To Do
- [x] GraphQL API
- [ ] Responsive Images
- [ ] Responsive Images of maps
- [ ] Server-side Graph Rendering
