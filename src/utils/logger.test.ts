import log4js from 'log4js';

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

import { logger } from './logger';

describe('logger', () => {
  it('should log info messages correctly', () => {
    const mockLogger = log4js.getLogger();
    const log = logger('TestLogger');
    log.info('Test message');
    expect(mockLogger.info).toHaveBeenCalledWith('Test message');
  });

  it('should log error messages correctly', () => {
    const mockLogger = log4js.getLogger();
    const log = logger('TestLogger');
    log.error('Error message');
    expect(mockLogger.error).toHaveBeenCalledWith('Error message');
  });
});