import { LanguageCode } from 'grammy/types';
import { LangStore, PhKeys } from './types.js';
import { ru_store } from './ru_store.js'; // Ensure this path is correct

const supportedLanguages = {
  en: ru_store,
  ru: ru_store,
};
const getStore = (lang: LanguageCode): LangStore => {
  const _store = supportedLanguages[lang];
  return _store ? _store : supportedLanguages['en'];
};

export function getText(
  key: PhKeys,
  lang: LanguageCode = 'en',
  args: Array<string | number> = [],
): string {
  const _store = getStore(lang);
  if (typeof _store[key] === 'function') {
    return _store[key](...args);
  }
  return _store[key];
}
