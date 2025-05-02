import { conf } from '../config.js';
import { logger } from './utils/logger.js';
import { initBot } from './services/bot/bot.js';
import { initDatabase } from './utils/database.js';
import express from 'express';

(async (): Promise<void> => {
  const log = logger('Main');
  log.info('start');
  const {
    firebase,
    authFirebase: { email, password },
  } = conf;
  await initDatabase(firebase, email, password);
  await initBot(conf.botToken);

  const app = express();
  app.use(express.json());

  app.get('/ping', (_, res) => {
    res.json({ message: 'Hello, World!' });
  });

  // Start the server on port 3000
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
})();
