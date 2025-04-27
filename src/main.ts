import { conf } from '../config';
import { logger } from './utils/logger';
import { initBot } from './services/bot/bot.js';
import { initDatabase } from './utils/database.js';

(async (): Promise<void> => {
  const log = logger('Main');
  log.info('start');
  const {
    firebase,
    authFirebase: { email, password },
  } = conf;
  await initDatabase(firebase, email, password);
  await initBot(conf.botToken);
})();
