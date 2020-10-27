/**
 * This file is to be used when the database must be reinitialised.
 */
const dotenv = require("dotenv");
const logger = require("../logger");

dotenv.config();

const { sequelize } = require("./index");

logger.info("🚜 Beginning database sync...");

sequelize
  .sync({ force: true })
  .then(() => {
    logger.info("✅ Completed database sync!");
    process.exit();
  })
  .catch(e => {
    logger.error(e);
  });
