import { conf } from '../config.js';
import { logger } from './utils/logger.js';
import { initBot } from './servises/bot.js';
import { initDatabase } from './utils/database.js';

(async (): Promise<void> => {
  const log = logger('Main');
  log.log('start');
  const {
    firebase,
    authFirebase: { email, password },
  } = conf;
  await initDatabase(firebase, email, password);
  await initBot(conf.botToken);
})();
