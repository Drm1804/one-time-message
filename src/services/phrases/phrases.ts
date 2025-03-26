import { LanguageCode } from 'grammy/types';
import { ru_store } from './ru_store.js';
import { LangStore, PhKeys } from './types.js';

const supportedLanguages = {
  en: ru_store,
  ru: ru_store,
};
const getStore = (lang: LanguageCode): LangStore => {
  const _store = supportedLanguages[lang];
  return _store ? _store : supportedLanguages['en'];
};

export function getText(
  lang: LanguageCode,
  key: PhKeys,
  args: Array<string | number> = [],
): string {
  const _store = getStore(lang);
  if (typeof _store[key] === 'function') {
    return _store[key](...args);
  }
  return _store[key];
}
