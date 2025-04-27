import log4js from 'log4js';

log4js.configure({
  appenders: {
    out: { type: 'console' },
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
  },
});

export const logger = (
  name: string,
): { info: (message: string) => void; error: (message: string) => void } => {
  const logInstance = log4js.getLogger(name);
  return {
    info: (message: string): void => logInstance.info(message),
    error: (message: string): void => logInstance.error(message),
  };
};
