/**
 * This file is to be used when the database must be reinitialised.
 */
import * as dotenv from 'dotenv';
import logger from '../logger';

dotenv.config();

const {sequelize} = require('./index');

logger.info('🚜 Beginning database sync...');

sequelize
  .sync({force: true})
  .then(() => {
    logger.info('✅ Completed database sync!');
    throw Error;
  })
  .catch((e: Error) => {
    logger.error(e);
  });
