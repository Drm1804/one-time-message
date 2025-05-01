import { initializeApp } from 'firebase/app';
import {
  Database,
  get,
  getDatabase,
  ref,
  remove,
  set,
} from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { logger } from './logger.js';

let db: Database;
const log = logger('DB');

export const PATH = {
  messages: '/messages/',
};

import { FirebaseOptions } from 'firebase/app';
import { MessageStructure } from '../components/viewer/types.js';

export async function initDatabase(
  firebase: FirebaseOptions,
  email: string,
  password: string,
): Promise<Database | undefined> {
  const app = initializeApp(firebase);
  try {
    await signInWithEmailAndPassword(getAuth(), email, password);
    db = getDatabase(app);
  } catch (err) {
    log.error(String(err));
  }

  return db;
}

export const getDb = (): Database => db;

export async function getMessage<M>(id: string): Promise<M | null> {
  log.info('getMessage');
  return new Promise((resolve, reject) => {
    get(ref(db, PATH.messages + id))
      .then((snapshot) => resolve(snapshot.val()), reject)
      .catch(reject);
  });
}

export async function removeMessage(id: string): Promise<void> {
  log.info('readMessage');
  remove(ref(db, PATH.messages + id));
}

export async function setMessage(id: string, message: string): Promise<void> {
  const data: MessageStructure = {
    text: message,
    id,
  };
  log.info('setMessage');
  set(ref(db, PATH.messages + id), data);
}
