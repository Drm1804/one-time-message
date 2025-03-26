import { LangStore } from './types.js';

export const ru_store: LangStore = {
  updateTlgProgress: (t: string) => `[telegram] Загрузка файла: ${t}%`,
};
