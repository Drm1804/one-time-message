import { LanguageCode } from 'grammy/types';
import { BotContext } from '../services/bot/bot.js';

export async function pause(val = 100): Promise<null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, val);
  });
}

export function lang(ctx: BotContext): LanguageCode {
  if (ctx.from?.language_code) {
    return ctx.from.language_code as LanguageCode;
  }
  if (ctx.me.language_code) {
    return ctx.me.language_code as LanguageCode;
  }
  return 'en';
}
