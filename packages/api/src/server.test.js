const request = require("supertest");
const { expect } = require("chai");
const server = require("./server");

it("should respond", function(done) {
  request(server)
    .post("/graphiql")
    .send({ query: `{ summary { netWorth } }` })
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.data.summary.netWorth).to.be.a("number");
      done();
    });
});
