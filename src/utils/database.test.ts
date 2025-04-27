import { initDatabase, getDb, getMessage, removeMessage, setMessage } from './database';
import { PATH } from './database';
import { jest } from '@jest/globals';
import { ref, remove, set } from 'firebase/database';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({ mockApp: true })),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(() => ({ mockDb: true })),
  ref: jest.fn(),
  get: jest.fn(() =>
    Promise.resolve({ val: () => ({ id: '123', text: 'Test message' }) }),
  ),
  remove: jest.fn(),
  set: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ mockAuth: true })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
}));

jest.mock('log4js', () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };
  return {
    configure: jest.fn(),
    getLogger: jest.fn(() => mockLogger),
  };
});

describe('initDatabase', () => {
  it('should initialize the database and return the instance', async () => {
    const firebaseConfig = { apiKey: 'test' };
    const db = await initDatabase(
      firebaseConfig,
      'test@example.com',
      'password',
    );
    expect(db).toEqual({ mockDb: true });
  });
});

describe('getDb', () => {
  it('should return the current database instance', () => {
    const db = getDb();
    expect(db).toBeDefined();
  });
});

describe('getMessage', () => {
  it('should retrieve a message by ID', async () => {
    const message = await getMessage('123');
    expect(message).toEqual({ id: '123', text: 'Test message' });
  });
});

describe('removeMessage', () => {
  it('should remove a message by ID', async () => {
    await removeMessage('123');
    expect(remove).toHaveBeenCalledWith(
      ref(expect.anything(), PATH.messages + '123'),
    );
  });
});

describe('setMessage', () => {
  it('should store a message with the given ID and content', async () => {
    const message = 'Hello, world!';
    await setMessage('123', message);
    expect(set).toHaveBeenCalledWith(
      ref(expect.anything(), PATH.messages + '123'),
      {
        text: message,
        id: '123',
      },
    );
  });
});
