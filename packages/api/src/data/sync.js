/**
 * This file is to be used when the database must be reinitialised.
 */
const dotenv = require("dotenv");
const logger = require("../logger");

dotenv.config();

const { Conn } = require("./index");

const syncDatabase = async function syncDatabase() {
  logger.info("🚜 Beginning database sync...");
  await Conn.sync({ force: true });
  logger.info("✅ Completed database sync!");
  process.exit();
};

syncDatabase();
