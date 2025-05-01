import { LanguageCode } from 'grammy/types';
import { LangStore, PhKeys } from './types.js';
import { ru_store } from './ru_store.js';
import { en_store } from './en_store.js';
import { es_store } from './es_store.js';

const supportedLanguages = {
  en: en_store,
  es: es_store,
  ru: ru_store,
};
const getStore = (lang: LanguageCode): LangStore => {
  const _store = supportedLanguages[lang as keyof typeof supportedLanguages];
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
