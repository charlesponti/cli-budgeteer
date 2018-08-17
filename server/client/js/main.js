$.post(
  "/graphiql",
  { query: `{ transactions { date, amount, payee } }` },
  data => {
    console.log(data);
  }
);
