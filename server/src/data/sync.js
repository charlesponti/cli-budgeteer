/**
 * This file is to be used when the database must be reinitialised.
 */

const { Conn } = require("./index");

// Sync models
Conn.sync().then(function() {
  process.exit(0);
});
