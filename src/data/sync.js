/**
 * This file is to be used when the database must be reinitialised.
 */
const dotenv = require("dotenv");
const logger = require("../logger");

dotenv.config();

const { Conn } = require("./index");

// logger.info("🚜 Beginning database sync...");

Conn.sync({ force: true })
  .then(() => {
    logger.info("✅ Completed database sync!");
    process.exit();
  })
  .catch(e => {
    console.log(e);
  });
